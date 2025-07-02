import { NextRequest } from 'next/server';
import { badRequest, serverError, success } from '@/lib/utils/responseHandler';
import { getProduceListings, ListingStatus } from '@/actions/produce/produceListingActions';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { farmId, status, page, limit } = body;

    if (!farmId || !status) {
      return badRequest('farmId and status are required');
    }

    // Validate status against our custom ListingStatus type
    const validStatuses: ListingStatus[] = ['active', 'draft', 'harvest', 'sold'];
    if (!validStatuses.includes(status)) {
      return badRequest('Invalid status. Must be one of: active, draft, harvest, sold');
    }

    const data = await getProduceListings({
      farmId,
      status,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
    });

    return success(data);
  } catch (error) {
    return serverError('Failed to load produce listings', error as Error);
  }
}