import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Toaster } from "sonner";
import { LangProvider } from "@/i18n/LangContext";
import { ThemeProvider } from "@/lib/ThemeContext";

export const metadata: Metadata = {
  title: "TestPro — Online Testing Platform",
  description: "Modern online testing platform for students",
  icons: {
    icon: "/logo1.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <LangProvider>
            <Navbar />
            <main className="pt-16">{children}</main>
            <Footer />
            <Toaster richColors position="top-right" />
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
