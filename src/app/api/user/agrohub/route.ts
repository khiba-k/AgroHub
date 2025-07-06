import { getUserObj } from "@/actions/auth/BasicAuthActions";
import { getAgroHubUserByUserId } from "@/actions/users/UserActions";
import { notFound, serverError, success, unauthorized } from "@/lib/utils/responseHandler";
export const dynamic = "force-dynamic";


export async function GET() {
  try {
    const user = await getUserObj();
    if (!user) return unauthorized("You must be logged in");

    const agroUser = await getAgroHubUserByUserId(user.id);
    if (!agroUser) return notFound("AgroHub user not found");

    return success(agroUser);
  } catch (error) {
    return serverError("Failed to fetch AgroHub user", error instanceof Error ? error : new Error(String(error)));
  }
}
