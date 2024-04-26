import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const products = await db.product.findMany({
      where: {
        best_seller: true,
      },
      orderBy: { createdAt: "desc" },
      include: {
        sizes: true,
      },
    });

    return NextResponse.json({ data: products }, { status: 200 });
  } catch (error) {
    console.log("PRODUCT GET:", error);
  }
}
