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
    // Try get custom API error
    const errorResponse = await response.json().catch(() => ({}));
    const message = errorResponse?.error || "Failed to create listing";
    const status = response.status;

    // Pass both up
    throw new Error(JSON.stringify({ message, status }));
  }

  return response.json();
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


export async function updateProduceListing(formData: FormData) {
  const res = await fetch("/api/produce/farmer/update/listing", {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json();
    throw new Error(JSON.stringify({
      message: body.error || "Unknown error",
      status: res.status
    }));
  }

  return await res.json();
}
