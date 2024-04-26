import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const session = await auth();

    data.price = parseFloat(data.price);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!session.user?.isAdmin) {
      return NextResponse.json(
        { error: "you should be admin." },
        { status: 401 }
      );
    }
    const product = await db.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
        category: {
          connect: {
            id: data.categoryId,
          },
        },
      },
    });

    return NextResponse.json({ data: product }, { status: 201 });
  } catch (error) {
    console.log("PRODUCT POST:", error);
  }
}

export async function GET(req: NextRequest) {
  try {
    const products = await db.product.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        sizes: true,
        category: true,
      },
    });

    return NextResponse.json({ data: products }, { status: 200 });
  } catch (error) {
    console.log("PRODUCT GET:", error);
  }
}
