import { auth } from "@/auth";
import { CartItem } from "@/hooks/use-cart";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  const data = await req.json();
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orderData = data.items.map((item: CartItem) => {
    return {
      id: item.item.id,
      name: item.item.name,
      quantity: item.quantity,
      size: item.size,
      image: item.item.image,
      price: item.item.price,
    };
  });

  const total = data.items.reduce((acc: number, item: CartItem) => {
    return acc + item.item.price! * item.quantity;
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

  const line_items = data.items.map((item: CartItem) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: `${item.item.name} - ${item.size}`,
          images: [item.item.image],
        },

        unit_amount: item.item.price! * 100,
      },
      quantity: item.quantity,
    };
  });

  const sessionStripe = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${req.nextUrl.origin}/cart?success=1`,
    cancel_url: `${req.nextUrl.origin}/cart?canceled=1`,
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
