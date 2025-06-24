import { TempoInit } from "@/components/tempo-init";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { I18nProvider } from "@/components/i18n-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import axios from "../lib/utils/axios";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgroHub - Agricultural Social Network for Africa",
  description:
    "Connect with farmers, distributors, retailers and more in the agricultural ecosystem across South Africa, Kenya, and Lesotho",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <Script src="https://api.tempolabs.ai/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            {children}
            <TempoInit />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
