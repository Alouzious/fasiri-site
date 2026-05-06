import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fasiri - African Language Translator",
  description:
    "Translate English to 19+ African languages instantly. Powered by Fasiri API - the unified African language intelligence platform.",
  openGraph: {
    title: "Fasiri - African Language Translator",
    description: "Translate English to 19+ African languages instantly.",
    url: "https://fasiri-demo.vercel.app",
    siteName: "Fasiri",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
