// app/api/user/farm/route.ts

import { getUserObj } from "@/actions/auth/BasicAuthActions";
import { getFarmerDetailsByUserId } from "@/actions/users/UserActions";
import { notFound, serverError, success, unauthorized } from "@/lib/utils/responseHandler";

export async function GET() {
  try {
    const user = await getUserObj();
    if (!user) return unauthorized("You must be logged in");

    const farmer = await getFarmerDetailsByUserId(user.id);
    if (!farmer) return notFound("Farmer record not found");

    return success(farmer);
  } catch (error) {
    return serverError(
        "Failed to fetch farm info",
        error instanceof Error ? error : new Error(String(error))
    );
  }
}
