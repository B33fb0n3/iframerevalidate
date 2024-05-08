import "./globals.css";
import { Inter as FontSans } from "next/font/google"
import type { Metadata } from "next";

import {cn} from "@/lib/utils";
import GlobalProvider from "@/app/GlobalProvider";
import {ReactNode} from "react";
import {getBaseUrl} from "@/lib/urls";
import {siteConfig} from "@/lib/siteconfig";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
    metadataBase: new URL(getBaseUrl()),
    title: {
        default: siteConfig.title,
        template: siteConfig.titleTemplate,
    },
    description: siteConfig.description,
    alternates: {
        canonical: getBaseUrl(),
    },
    openGraph: {
        title: {
            default: siteConfig.title,
            template: siteConfig.titleTemplate,
        },
        description: siteConfig.description,
        type: 'website',
        url: getBaseUrl(),
        siteName: siteConfig.title,
    },
    twitter: {
        card: 'summary',
        title: siteConfig.title,
        description: siteConfig.description,
    },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
          <body className={cn(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable
          )}>
              <GlobalProvider>
                  {children}
              </GlobalProvider>
          </body>
    </html>
  );
}
