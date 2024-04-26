import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Product } from "@prisma/client";
import { url } from "inspector";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  const data = await req.json();
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orderData = data.items.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      size: item.size,
      image: item.image,
      price: item.price,
    };
  });

  const total = data.items.reduce((acc: number, item: any) => {
    return acc + item.price * item.quantity;
  }, 0);

  const order = await db.order.create({
    data: {
      total,
      items: orderData,
      user: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });

  const line_items = data.items.map((item: any) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: `${item.name} - ${item.size}`,
          images: [item.image],
        },

        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  const sessionStripe = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${req.nextUrl.origin}/checkout/success`,
    cancel_url: `${req.nextUrl.origin}/checkout/cancel`,
    metadata: {
      orderId: order.id,
    },
    payment_intent_data: {
      metadata: {
        orderId: order.id,
      },
    },
  });

  return NextResponse.json(
    { url: sessionStripe.url, id: sessionStripe.id },
    { status: 200 }
  );
}
