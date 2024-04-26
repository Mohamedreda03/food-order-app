import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: { productId: string } }
) {
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

  // Delete the category with the given ID
  await db.product.delete({ where: { id: productId } });

  return NextResponse.json({ message: "product deleted" }, { status: 200 });
}

export async function GET(
  req: NextRequest,
  context: { params: { productId: string } }
) {
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

  const data = await db.product.findFirst({ where: { id: productId } });

  return NextResponse.json(data, { status: 200 });
}

export async function PUT(
  req: NextRequest,
  context: { params: { productId: string } }
) {
  const productId = context.params.productId;
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

  const data = await db.product.update({
    where: { id: productId },
    data: body,
  });

  return NextResponse.json(data, { status: 200 });
}
