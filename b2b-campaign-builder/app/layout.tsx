import "./globals.css";
import type React from "react";
import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { poppins } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "AdGenius | B2B Google Ads Campaign Generator",
  description:
    "Generate high-performing Google Ads campaigns for B2B service companies from a landing page URL",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
