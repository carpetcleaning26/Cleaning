import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Canberra Carpet Cleaning Deals | Top Rated Cleaners & 100% Bond Back",
  description: "Professional carpet steam cleaning, end of lease cleaning, upholstery care, tile grout wash & pest control across all Canberra ACT suburbs. Book online or call 0481 734 225.",
  keywords: [
    "Carpet cleaning Canberra",
    "End of lease cleaning Canberra",
    "Carpet steam clean deals Canberra",
    "Upholstery cleaning Canberra",
    "Tile and grout cleaning Canberra",
    "ACT carpet cleaners",
    "Cheap carpet cleaning Canberra",
    "Bond back guarantee cleaners Canberra"
  ],
  openGraph: {
    title: "Canberra Carpet Cleaning Deals | Professional Cleaning Services",
    description: "Carpet steam cleaning from $27/room. 100% Bond back guarantee for rental handovers across all ACT suburbs.",
    url: "https://canberracarpetcleaningdeals.com.au",
    siteName: "Canberra Carpet Cleaning Deals",
    locale: "en_AU",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Canberra Carpet Cleaning Deals",
              "image": "https://canberracarpetcleaningdeals.com.au/assets/images/main-logo.png",
              "telephone": "0481 734 225",
              "email": "info@canberracarpetcleaningdeals.com.au",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "City Walk",
                "addressLocality": "Canberra",
                "addressRegion": "ACT",
                "postalCode": "2601",
                "addressCountry": "AU"
              },
              "priceRange": "$$",
              "openingHours": "Mo-Su 07:00-20:00"
            })
          }}
        />
      </head>
      <body className="bg-[#f0f9ff] text-slate-900 min-h-screen flex flex-col antialiased selection:bg-sky-500 selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}

