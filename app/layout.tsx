import "./globals.css";

import type { Metadata } from "next";

const metadata: Metadata = {
  title: "GoBiblio",
  description: "Système de gestion de bibliothèque [NSI]",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>): React.ReactElement => {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
};

export { metadata };
export default RootLayout;
