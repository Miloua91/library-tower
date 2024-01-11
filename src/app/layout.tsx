import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "tailwindcss/tailwind.css";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "@/components/Header";

const font = EB_Garamond({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Library Tower",
  description: "Read public domain books",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Header />
        <Toaster position="bottom-center"/>
        {children}
      </body>
    </html>
  );
}
