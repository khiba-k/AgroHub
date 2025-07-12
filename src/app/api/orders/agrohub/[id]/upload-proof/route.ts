import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { uploadImage } from "@/lib/supabase/uploadimage";

export const POST = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const id = params.id;

    if (!id) {
        return NextResponse.json({ error: "Missing ID." }, { status: 400 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
        return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    // Upload the proof of payment to Supabase
    const { imageUrl, error } = await uploadImage({
        file,
        bucket: "agrohubdocs",
        folder: "paymentproof",
    });

    if (error || !imageUrl) {
        console.error("[UPLOAD_PROOF_ERROR]", error);
        return NextResponse.json({ error: "Failed to upload proof." }, { status: 500 });
    }

    // Update the order breakdown with the proof URL
    const updated = await prisma.orderItemBreakdown.update({
        where: { id },
        data: {
            paymentProofUrl: imageUrl,
        },
    });

    return NextResponse.json({ success: true, proofUrl: imageUrl });
};
