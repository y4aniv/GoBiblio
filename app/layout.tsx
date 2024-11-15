import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import type { MantineProviderProps } from "@mantine/core";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const metadata: Metadata = {
  title: "GoBiblio",
  description: "Système de gestion de bibliothèque [NSI]",
};

const MANTINE_THEME: MantineProviderProps["theme"] = {
  defaultRadius: "md",
  primaryColor: "dark",
  fontFamily: "var(--font-family)",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>): React.ReactElement => {
  return (
    <html lang="fr">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <NuqsAdapter>
          <MantineProvider theme={MANTINE_THEME}>
            <Notifications position={"top-right"} autoClose={5000} />
            {children}
          </MantineProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
};

export { metadata };
export default RootLayout;
