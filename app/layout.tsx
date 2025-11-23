import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Construction Loan Administration Platform",
  description: "MVP Prototype for Construction Loan Administration SaaS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

