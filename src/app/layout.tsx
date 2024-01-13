import type { Metadata, Viewport } from "next";
import { EB_Garamond } from "next/font/google";
import "tailwindcss/tailwind.css";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "@/components/Header";

const font = EB_Garamond({ subsets: ["latin"] });

const APP_NAME = "Library Tower";
const APP_DEFAULT_TITLE = "Library Tower";
const APP_TITLE_TEMPLATE = "Library Tower";
const APP_DESCRIPTION = "Read public domain books.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: APP_DEFAULT_TITLE,
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
 /* openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },*/
};

export const viewport: Viewport = {
  themeColor: "black",
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
        <Toaster position="bottom-center" />
        {children}
      </body>
    </html>
  );
}
