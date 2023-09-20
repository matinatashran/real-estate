import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";

// providers
import NextAuthProvider from "@/providers/NextAuthProvider";

// styles
import "../styles/globals.css";

// layout
import Layout from "@/layout/Layout";

export const roboto = Roboto_Mono({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Real Estate",
  description:
    "The leading real estate marketplace. Search millions of for-sale and rental.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <NextAuthProvider>
          <Layout>{children}</Layout>
        </NextAuthProvider>
      </body>
    </html>
  );
}
