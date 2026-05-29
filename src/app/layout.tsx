import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "For Donia ❤️ | A Love Letter",
  description: "A digital love letter from Youssef to Donia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-dark-bg text-cream antialiased">
        {children}
      </body>
    </html>
  );
}
