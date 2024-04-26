import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const foundUser = await db.user.findUnique({
    where: {
      email: session.user?.email!,
    },
  });

  if (!foundUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const user = await db.user.update({
    where: {
      id: foundUser.id,
    },
    data,
  });

  return NextResponse.json(user);
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const foundUser = await db.user.findFirst({
      where: {
        id: session.user?.id!,
      },
      select: {
        name: true,
        email: true,
        image: true,
        tel: true,
        street_address: true,
        post_code: true,
        city: true,
        country: true,
        isAdmin: true,
      },
    });

    if (!foundUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: foundUser });
  } catch (error) {
    console.log("PROFILE POST:", error);
  }
}
