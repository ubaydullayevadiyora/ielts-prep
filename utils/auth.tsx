// lib/auth.ts
import axiosInstance from "../utils/axios";

export const login = async (email: string) => {
  const res = await axiosInstance.post("/auth/login", { email });
  const token = res.data.token;

  if (token) {
    localStorage.setItem("token", token); // persist token
  }

  return token;
};
