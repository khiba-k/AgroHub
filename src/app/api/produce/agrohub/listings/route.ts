// app/api/produce/listings/route.ts

import { getActiveListings } from "@/actions/produce/produceListingActions";
import { serverError, success } from "@/lib/utils/responseHandler";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const category = searchParams.get("category") || undefined;
        const name = searchParams.get("name") || undefined;
        const type = searchParams.get("type") || undefined;

        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "6");

        const listings = await getActiveListings({
            category,
            name,
            type,
            page,
            limit,
        });

        return success(listings, "Listings fetched");
    } catch (error) {
        return serverError("Failed to fetch listings", error as Error);
    }
}
