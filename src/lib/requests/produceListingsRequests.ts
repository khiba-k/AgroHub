// lib/api/fetchProduceListings.ts
import axios from 'axios';
// lib/api/postProduceListing.ts

export const postProduceListing = async (listingData: any) => {
  const response = await axios.post("/api/produce/farmer/add/listings", listingData);
  return response.data;
};

// Fetch produce listing for farm to manage
export const fetchProduceListings = async ({
  farmId,
  status,
  page,
  limit = 6,
}: {
  farmId: string;
  status: string;
  page: number;
  limit?: number;
}) => {
  const response = await axios.post('/api/produce/farmer/listings', {
    farmId,
    status,
    page,
    limit,
  });
  return response.data.data;
};

export interface FetchListingsParams {
  category?: string;
  name?: string;
  type?: string;
  status?: string; // optional override
  page?: number;
  limit?: number;
}

// Fetch produce listing for AgroHub
export const filterProduceListings = async ({
  category,
  name,
  type,
  status = "active",
  page = 1,
  limit = 6,
}: FetchListingsParams) => {
  const response = await axios.get("/api/produce/agrohub/listings", {
    params: {
      category,
      name,
      type,
      status,
      page,
      limit,
    },
  });
  return response.data.data;
};
