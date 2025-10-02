import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";

export const metadata: Metadata = {
  title: "My Todo",
  description: "One-page / three-step todo using shadcn/ui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen bg-background text-foreground">
            <header className="flex items-center justify-between p-4">
              <h1 className="text-lg font-semibold">My Todo</h1>
              <ModeToggle />
            </header>
            <main className="p-6">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
