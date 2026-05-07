import { Geist, Geist_Mono, Nunito_Sans } from "next/font/google";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "./globals.css";

const nunitoSans = Nunito_Sans({ subsets: ["latin"], variable: "--font-sans" });
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pico — Pick your stack. Ship it.",
  description:
    "Choose from 100+ battle-tested technologies across every layer of your stack. Export architecture diagrams and AI scaffold prompts in one click.",
  metadataBase: new URL("https://usepico.vercel.app"),
  openGraph: {
    title: "Pico — Pick your stack. Ship it.",
    description:
      "Choose from 100+ battle-tested technologies across every layer of your stack. Export architecture diagrams and AI scaffold prompts in one click.",
    url: "https://usepico.vercel.app/stack-picker",
    siteName: "Pico",
    images: [
      {
        url: "/og-banner.png",
        width: 1200,
        height: 630,
        alt: "Pico — Pick your stack. Ship it.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pico — Pick your stack. Ship it.",
    description:
      "Choose from 100+ battle-tested technologies across every layer of your stack. Export architecture diagrams and AI scaffold prompts in one click.",
    images: ["/og-banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        nunitoSans.variable,
      )}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
