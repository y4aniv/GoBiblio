import { redirect } from "next/navigation";

import withAuth from "@/utils/withAuth";

const AuthVerifyEmailLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>): Promise<React.ReactElement> => {
  const auth = await withAuth();

  if (!auth.isAuthenticated) {
    redirect("/auth/login");
  }

  return <>{children}</>;
};

export default AuthVerifyEmailLayout;
