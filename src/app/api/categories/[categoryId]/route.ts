import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: { categoryId: string } }
) {
  const categoryId = context.params.categoryId;
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
    const hasProducts = await db.product.findFirst({
      where: { categoryId: categoryId },
    });

    if (hasProducts) {
      return NextResponse.json(
        { error: "Category has products, can't delete." },
        { status: 400 }
      );
    }

    // Delete the category with the given ID
    const data = await db.category.delete({ where: { id: categoryId } });

    return NextResponse.json({ message: "category deleted" }, { status: 200 });
  } catch (error) {
    console.log("CATEGORY DELETE:", error);
  }
}

export async function GET(
  req: NextRequest,
  context: { params: { categoryId: string } }
) {
  const categoryId = context.params.categoryId;
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    if (!session.user?.isAdmin) {
      return NextResponse.json(
        { error: "you should be admin." },
        { status: 401 }
      );
    }

    const data = await db.category.findFirst({ where: { id: categoryId } });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("CATEGORY GET:", error);
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: { categoryId: string } }
) {
  const categoryId = context.params.categoryId;
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
  try {
    const data = await db.category.update({
      where: { id: categoryId },
      data: body,
      include: {
        products: true,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("CATEGORY PUT:", error);
  }
}
