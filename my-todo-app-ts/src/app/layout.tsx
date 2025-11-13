// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./Providers"; // Client wrapper

export const metadata: Metadata = {
  title: "My Todo",
  description: "A modern todo app with drag & drop and user login",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
            <Navbar />
            <main className="flex-1 p-6 fade-in">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
