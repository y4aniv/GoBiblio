import { cookies } from "next/headers";

import apiClient from "./apiClient";

const isAuthenticated = async (): Promise<boolean> => {
  const cookieStore = await cookies();

  const res = await apiClient.get("/auth/me", {
    headers: {
      Cookie: cookieStore
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; "),
    },
    validateStatus: () => true,
  });

  return res.status === 200;
};

const withAuth = async (): Promise<{ isAuthenticated: boolean }> => {
  return {
    isAuthenticated: await isAuthenticated(),
  };
};

export default withAuth;
