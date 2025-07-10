import prisma from "@/lib/prisma/prisma";
import { farmUpdateSchema } from "@/lib/utils/farmer/FarmerProfileUtils";
import { badRequest, notFound, serverError, success } from "@/lib/utils/responseHandler";
import { NextRequest } from "next/server";


export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = farmUpdateSchema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.errors.map((e) => e.message).join("\n");
      return badRequest(errors);
    }

    const {
      id,
      name,
      description,
      district,
      country,
      contactNumber1,
        contactNumber2,
    } = parsed.data;

    const existingFarm = await prisma.farm.findUnique({ where: { id } });

    if (!existingFarm) {
        return notFound("Farm not found");
    }

    const updatedFarm = await prisma.farm.update({
        where: { id },
        data: {
        name,
        description,
        district,
        country,
        contactNumber1,
        contactNumber2,
        },
    });

    return success(updatedFarm, "Farm updated successfully");
    } catch (error) {
    return serverError(
        "Failed to update farm",
        error instanceof Error ? error : new Error(String(error))
    );
    }
}
