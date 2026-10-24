import type { Metadata, Viewport } from "next";
import { Caveat, Nunito } from "next/font/google";
import { ReducedMotion } from "@/components/motion-config";
import { bhumi } from "@/lib/notebook";
import { earlyThemeScript } from "@/lib/theme";
import "./globals.css";

const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"] });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${bhumi.name} · Notebook Portfolio`,
  description: `${bhumi.name}, ${bhumi.degree} student at ${bhumi.uni}. ${bhumi.subtitle}`,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1f2a24" },
    { media: "(prefers-color-scheme: light)", color: "#fdfaf1" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${caveat.variable} dark antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: earlyThemeScript }} />
      </head>
      <body className="min-h-screen font-sans">
        <ReducedMotion>{children}</ReducedMotion>
      </body>
    </html>
  );
}
