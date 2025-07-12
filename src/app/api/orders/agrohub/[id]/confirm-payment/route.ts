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
        agrohubConfirmsPayment: true,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[CONFIRM_PAYMENT_ERROR]", err);
    return NextResponse.json({ error: "Failed to confirm payment." }, { status: 500 });
  }
};
