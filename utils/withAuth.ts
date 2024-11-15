import { cookies } from "next/headers";

import apiClient from "./apiClient";

const getAuthResponse = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  return apiClient.get("/auth/me", {
    headers: {
      Cookie: cookieHeader,
    },
    validateStatus: () => true,
  });
};

const withAuth = async (): Promise<{ isAuthenticated: boolean; isEmailVerified: boolean }> => {
  const res = await getAuthResponse();
  return {
    isAuthenticated: res.status === 200,
    isEmailVerified: res.status === 200 && res.data?.data.email.verified,
  };
};

export default withAuth;
