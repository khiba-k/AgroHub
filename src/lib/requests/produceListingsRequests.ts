// lib/api/fetchProduceListings.ts
import axios from 'axios';
import { UpdateProduceListingInput } from '../utils/farmer/FarmListingUtils';
// lib/api/postProduceListing.ts

export async function postProduceListing(formData: FormData) {
  const response = await fetch("/api/produce/farmer/add/listings", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to create listing");
  }

  return response.json(); // should be the full created listing object
}

export interface FetchProduceListingsParams {
  farmId: string;
  status: string;
  page?: number;   // optional page number
  limit?: number;  // optional limit number
}

export const fetchProduceListings = async ({
  farmId,
  status,
  page,
  limit,
}: FetchProduceListingsParams) => {
  // Build request body with optional pagination
  const body: any = { farmId, status };
  if (page !== undefined) body.page = page;
  if (limit !== undefined) body.limit = limit;

  const response = await axios.post("/api/produce/farmer/listings", body);

  // Return data as-is; adjust here if backend wraps listings in an object
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


export async function updateProduceListing(payload: any) {
  const response = await axios.put("/api/produce/farmer/update/listing", payload);

  if (!response.data) {
    throw new Error("Failed to update listing");
  }

  return response.data; // should be the full updated listing object
}
