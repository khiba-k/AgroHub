import axios from "axios";

export const sendInvite = async (email: string, role: string = "agrohub") => {
  try {
    const response = await axios.post(
      "/api/invite",
      { email, role },
      { withCredentials: true } // ✅ THIS sends your cookies!
    );
    return { success: true, message: response.data.message };
  } catch (err: any) {
    return {
      success: false,
      message: err?.response?.data?.message || "Failed to send invite.",
    };
  }
};

// Fetch the invited email based on token
export const fetchInviteEmailByToken = async (token: string | null) => {
  try {
    const res = await axios.get(`/api/invite/email?token=${token}`);
    return res.data.data.email as string;
  } catch (err) {
    console.error("Failed to fetch invite email:", err);
    return null;
  }
};

// Accept the invite and register the user
export const submitInviteAcceptance = async ({
  token,
  firstName,
  lastName,
  password,
  confirmPassword,
  role,           // new
}: {
  token: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  role: string;    // new
}) => {
  try {
    const res = await axios.post("/api/invite/accept/agrohub", {
      token,
      firstName,
      lastName,
      password,
      confirmPassword,
      role,           // pass role in body
    });

    return {
      success: true,
      message: res.data.message || "Account created successfully",
    };
  } catch (err: any) {
    const message =
      err.response?.data?.message || "Something went wrong accepting invite";
    return {
      success: false,
      message,
    };
  }
};