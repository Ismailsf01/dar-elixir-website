import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { CartProvider } from '../contexts/CartContext';

const inter = Inter({ subsets: ["latin"] })

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Dar Elixir | Une touche de luxe",
  description:
    "Discover our curated collection of premium perfumes and fragrances. Find your signature scent with free shipping on orders over 500 MAD.",
  keywords: "perfume, fragrance, luxury perfumes, designer fragrances, Dar Elixir, parfums Maroc, Moroccan perfume, cologne",
  authors: [{ name: "Dar Elixir" }], // Changed to your brand name

  // --- Open Graph Metadata for social sharing ---
  openGraph: {
    title: "Dar Elixir | Une touche de luxe",
    description: "Discover our curated collection of premium perfumes and fragrances.",
    url: "https://www.darelixir.com", // Added full URL
    siteName: "Dar Elixir", // Added site name
    images: [
      {
        url: "https://www.darelixir.com/og-image.png", // Added OG image
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className} ${playfair.variable}`}>
        <CartProvider>
          <LanguageProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </LanguageProvider>
        </CartProvider>
      </body>
    </html>
  )
}
