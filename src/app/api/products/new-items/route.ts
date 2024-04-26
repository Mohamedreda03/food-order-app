import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
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

    const products = await db.product.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
    });

    return NextResponse.json({ data: products }, { status: 200 });
  } catch (error) {
    console.log("CATEGORY GET:", error);
  }
}
