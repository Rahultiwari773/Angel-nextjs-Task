import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Angel Entry Experience | Romantic Interactive 3D Heaven",
  description:
    "An interactive romantic experience with fantasy heaven animations, 4 entry sequences, interactive rose launch particle physics, audio synthesizer, and enterprise architecture.",
  keywords: [
    "Angel Experience",
    "Next.js 15",
    "Three.js",
    "Framer Motion",
    "Romantic Web Application",
    "Fantasy Heaven Theme",
  ],
  openGraph: {
    title: "Angel Entry Experience",
    description: "Experience magical entry sequences of celestial angels in a romantic 3D heaven realm.",
    type: "website",
    url: "https://angelexperience.com",
    images: [
      {
        url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Angel Entry Experience Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Angel Entry Experience",
    description: "Romantic interactive web app built with Next.js 15 and WebGL.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Angel Entry Experience",
    "operatingSystem": "All",
    "applicationCategory": "EntertainmentApplication",
    "description": "Interactive romantic web application featuring celestial angel entry animations.",
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                darkMode: 'class',
                theme: {
                  extend: {
                    colors: {
                      gold: { 300: '#FDE68A', 400: '#FBBF24', 500: '#F59E0B', 600: '#D97706', 700: '#B45309' },
                      angel: { white: '#FFFDF7', gold: '#FFD700', pink: '#FFB6C1', purple: '#9D4EDD', sky: '#0F172A', deepSky: '#030712' }
                    }
                  }
                }
              }
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-400 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
