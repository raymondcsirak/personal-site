import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "./components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://raymi.xyz'),
  title: {
    default: "Raymond Csirak | DevOps Engineer & SRE",
    template: "%s | Raymond Csirak"
  },
  description: "DevOps Engineer and Site Reliability Engineer with expertise in Kubernetes, Infrastructure as Code, and CI/CD automation.",
  keywords: [
    "DevOps Engineer",
    "SRE", 
    "Site Reliability Engineer",
    "Kubernetes",
    "AWS",
    "Terraform",
    "CI/CD",
    "Automation",
    "Cloud Engineering",
    "Raymond Csirak"
  ],
  authors: [{ name: "Raymond Csirak" }],
  creator: "Raymond Csirak",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://raymi.xyz",
    title: "Raymond Csirak | DevOps Engineer & SRE",
    description: "DevOps Engineer and Site Reliability Engineer with expertise in Kubernetes, Infrastructure as Code, and CI/CD automation.",
    siteName: "Raymond Csirak Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Raymond Csirak - DevOps Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raymond Csirak | DevOps Engineer & SRE",
    description: "DevOps Engineer and Site Reliability Engineer with expertise in Kubernetes, Infrastructure as Code, and CI/CD automation.",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
      ><JsonLd />
        
        {children}
      </body>
    </html>
  );
}
