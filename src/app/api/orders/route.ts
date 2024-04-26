import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  const page = req.nextUrl.searchParams.get("page") || "1";
  const size = req.nextUrl.searchParams.get("size") || "10";

  const skip = (Number(page) - 1) * Number(size) || 0;
  const take = Number(size) || 10;

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
    const orders = await db.order.findMany({
      skip,
      take,
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const ordersCount = await db.order.count();
    const pageCount = Math.ceil(ordersCount / Number(size));

    return NextResponse.json(
      { data: orders, count: pageCount },
      { status: 200 }
    );
  } catch (error) {
    console.log("ORDERS GET:", error);
  }
}
