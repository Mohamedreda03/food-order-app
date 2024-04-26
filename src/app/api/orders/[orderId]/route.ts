import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { orderId: string } }
) {
  const { orderId } = context.params;
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!session.user?.isAdmin) {
    return NextResponse.json(
      { error: "you should be admin." },
      { status: 401 }
    );
  }

  try {
    const order = await db.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json({ data: order }, { status: 200 });
  } catch (error) {
    console.log("SINGLE ORDER GET:", error);
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: { orderId: string } }
) {
  try {
    const { orderId } = context.params;
    const body = await req.json();
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!session.user?.isAdmin) {
      return NextResponse.json(
        { error: "you should be admin." },
        { status: 401 }
      );
    }

    const data = await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        ...body,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("SINGLE ORDER PUT:", error);
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { orderId: string } }
) {
  try {
    const { orderId } = context.params;
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!session.user?.isAdmin) {
      return NextResponse.json(
        { error: "you should be admin." },
        { status: 401 }
      );
    }

    const data = await db.order.delete({
      where: {
        id: orderId,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("SINGLE ORDER DELETE:", error);
  }
}
