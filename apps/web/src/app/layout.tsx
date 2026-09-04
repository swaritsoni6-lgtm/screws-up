import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Screws Up | The Cooperative Guild for Skilled Trades",
  description:
    "Empowering skilled technicians with 88% revenue share, 0 upfront fees, and transparent genuine spare parts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
