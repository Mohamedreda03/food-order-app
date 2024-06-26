import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();

  const sig = req.headers.get("stripe-signature");

  let event: Stripe.Event | undefined;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log(event.type);
  } catch (error) {
    console.log("webhook error", error);
  }

  if (
    event?.type === "charge.succeeded" ||
    event?.type === "checkout.session.completed"
  ) {
    const orderId = event?.data?.object?.metadata?.orderId;

    await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "PAID",
      },
    });
  }

  return NextResponse.json({ received: true });
}
