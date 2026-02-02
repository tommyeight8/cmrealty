import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CM Realty | Buy, Sell & Real Estate Consulting",
    template: "%s | CM Realty",
  },
  description:
    "CM Realty helps you buy and sell property with confidence. Expert real estate consulting, market insights, and personalized guidance for buyers, sellers, and investors.",
  icons: {
    icon: "/cmrealty.png",
    shortcut: "/cmrealty.png",
    apple: "/cmrealty.png",
  },
  keywords: [
    "CM Realty",
    "real estate",
    "buy property",
    "sell property",
    "real estate consulting",
    "property consultant",
    "real estate advisor",
    "home buying",
    "home selling",
    "real estate investment",
  ],
  openGraph: {
    title: "CM Realty | Buy, Sell & Real Estate Consulting",
    description:
      "Buy smarter, sell faster, and invest with confidence. CM Realty offers expert real estate consulting and personalized service.",
    url: "https://cmrealty.com",
    siteName: "CM Realty",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CM Realty | Buy, Sell & Real Estate Consulting",
    description:
      "Expert guidance for buying, selling, and consulting in real estate.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
