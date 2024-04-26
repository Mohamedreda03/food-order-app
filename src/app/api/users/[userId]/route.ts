import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { userId: string } }
) {
  const { userId } = context.params;
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
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    console.log("SINGLE USER GET:", error);
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: { userId: string } }
) {
  try {
    const { userId } = context.params;
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

    const data = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        ...body,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("SINGLE USER PUT:", error);
  }
}
