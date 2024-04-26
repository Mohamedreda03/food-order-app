import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: { productId: string } }
) {
  try {
    let { name, price } = await req.json();
    price = parseFloat(price);
    const session = await auth();
    const { productId } = context.params;
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!session.user?.isAdmin) {
      return NextResponse.json(
        { error: "you should be admin." },
        { status: 401 }
      );
    }

    const data = await db.size.create({
      data: {
        name,
        price,
        productId,
      },
    });

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.log("POST on sizes route:", error);
  }
}

export async function GET(
  req: NextRequest,
  context: { params: { productId: string } }
) {
  try {
    const productId = context.params.productId;
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

    const data = await db.size.findMany({
      where: {
        productId: productId,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("GET on sizes route:", error);
  }
}
