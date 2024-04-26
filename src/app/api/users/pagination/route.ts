import { auth } from "@/auth";
import { db } from "@/lib/db";
import { count } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  const page = req.nextUrl.searchParams.get("page") || "1";
  const size = req.nextUrl.searchParams.get("size") || "10";

  const skip = (Number(page) - 1) * Number(size) || 0;
  const take = Number(size) || 10;

  if (!session) {
    return NextResponse.json({ error: "Unau thorized" }, { status: 401 });
  }

  if (!session.user?.isAdmin) {
    return NextResponse.json(
      { error: "you should be admin." },
      { status: 401 }
    );
  }

  try {
    const users = await db.user.findMany({
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
    });

    const usersCount = await db.user.count();
    const pageCount = Math.ceil(usersCount / Number(size));

    return NextResponse.json(
      { data: users, count: pageCount },
      { status: 200 }
    );
  } catch (error) {
    console.log("SINGLE USER GET:", error);
  }
}
