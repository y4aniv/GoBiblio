import { Card } from "@mantine/core";

import styles from "@/styles/app/auth/layout.module.css";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>): React.ReactElement => {
  return (
    <div className={styles.container}>
      <Card withBorder className={styles.container__card}>
        {children}
      </Card>
    </div>
  );
};

export default AuthLayout;
