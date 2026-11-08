
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SubTrack | Homeowners Association",
  description: "Manage household dues, payments, and parking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
