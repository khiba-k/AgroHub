import axios from "axios";

export const requestResetEmail = async (email: string) => {
  const res = await axios.post("/api/password/email", { email });
  return res.data;
};
