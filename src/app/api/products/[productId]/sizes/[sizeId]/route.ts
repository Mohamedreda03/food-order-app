import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// delete size
export async function DELETE(
  req: NextRequest,
  context: { params: { sizeId: string } }
) {
  const sizeId = context.params.sizeId;
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
    const data = await db.size.delete({
      where: {
        id: sizeId,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("DELETE on sizes route:", error);
  }
}
