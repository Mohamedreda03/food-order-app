"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
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
    const category = await db.category.create({
      data: {
        name: data.name,
        image: data.image,
      },
    });

    return NextResponse.json({ data: category }, { status: 201 });
  } catch (error) {
    console.log("CATEGORY POST:", error);
  }
}

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const categorys = await db.category.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        products: {
          orderBy: { createdAt: "desc" },
          include: {
            sizes: true,
          },
        },
      },
    });

    return NextResponse.json({ data: categorys }, { status: 200 });
  } catch (error) {
    console.log("CATEGORY GET:", error);
  }
}
