import prisma from "@/lib/prisma/prisma";
import { badRequest, notFound, serverError, success } from "@/lib/utils/responseHandler";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { farmId: string } }
) {
  const farmId = params.farmId;

  if (!farmId) {
    return badRequest("Missing farm ID in route");
  }

  try {
    // Confirm farm exists
    const farm = await prisma.farm.findUnique({
      where: { id: farmId },
    });

    if (!farm) {
      return notFound("Farm not found");
    }

    const methods = await prisma.paymentMethod.findMany({
      where: { farmId },
      orderBy: { isPrimary: "desc" }, // Primary first
    });

    console.log("Payment Methods: ", methods);

    return success({ methods }, "Payment methods fetched");
  } catch (error) {
    return serverError("Failed to fetch payment methods", error as Error);
  }
}
