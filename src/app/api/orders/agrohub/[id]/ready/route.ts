import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        await prisma.orderItemBreakdown.update({
            where: { id },
            data: {
                status: "READY_FOR_PICKUP",
            },
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
