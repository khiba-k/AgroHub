// utils/resetPasswordUtils.ts
import axios from "axios";

/**
 * Fetches the email associated with a reset token
 */
export const fetchEmailByToken = async (token: string) => {
  try {
    const res = await axios.get(`/api/password/email/fetch`, {
      params: { token },
    });

    return res.data?.data?.email as string | null;
  } catch (err: any) {
    console.error("Error fetching email by token:", err.response?.data || err.message);
    return null;
  }
};

/**
 * Sends a request to reset the user's password
 */
export const resetPassword = async (payload: {
  email: string;
  password: string;
  confirmPassword: string;
  token: string | null;
}) => {
  try {
    const res = await axios.post("/api/password/reset", payload);
    return { success: true, message: res.data?.message || "Password reset successful" };
  } catch (err: any) {
    console.error("Error resetting password:", err.response?.data || err.message);
    return {
      success: false,
      message: err.response?.data?.message || "Failed to reset password",
    };
  }
};
