// utils/requests/getFarmerInfoRequest.ts
import axios from "axios";

export const getFarmerInfoRequest = async () => {
  try {
    const res = await axios.get("/api/user/farm", {
      headers: {
        "Content-Type": "application/json",
        // Add other headers here if needed
      },
      withCredentials: true, // ensures cookies are sent (important for Supabase SSR auth)
    });

    return res.data?.data; // success handler wraps data inside .data
  } catch (error: any) {
    console.error("Failed to fetch farmer info:", error?.response?.data || error);
    return null;
  }
};
