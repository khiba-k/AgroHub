import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";

export const POST = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const id = params.id;

  if (!id) {
    return NextResponse.json({ error: "Missing ID." }, { status: 400 });
  }

  try {
    const updated = await prisma.orderItemBreakdown.update({
      where: { id },
      data: {
        cancelledBy: "AGROHUB",
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[CANCEL_ORDER_ERROR]", err);
    return NextResponse.json({ error: "Failed to cancel order." }, { status: 500 });
  }
};
