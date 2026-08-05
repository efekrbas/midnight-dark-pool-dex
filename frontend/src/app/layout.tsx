import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Midnight Dark Pool | Institutional ZK DEX",
  description: "Privacy-preserving order book and decentralized exchange powered by Midnight ZK circuits.",
};

import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import Breadcrumb from "@/components/Breadcrumb";
import FeedbackWidget from "@/components/FeedbackWidget";
import LiveTradeFeed from "@/components/LiveTradeFeed";
import CyberpunkRadio from "@/components/CyberpunkRadio";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import SplashScreen from "@/components/SplashScreen";
import PrivacyConsent from "@/components/PrivacyConsent";
import Footer from "@/components/Footer";
import { NotificationProvider } from "@/context/NotificationContext";
import { I18nProvider } from "@/context/I18nContext";
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased text-slate-100 bg-slate-950`}>
        <ThemeProvider>
          <I18nProvider>
            <NotificationProvider>
              <SplashScreen />
              <ScrollProgressBar />
              <Navbar />
              <Marquee />
              <Breadcrumb />
              {children}
              <Footer />
              <LiveTradeFeed />
              <CyberpunkRadio />
              <ScrollToTop />
              <PrivacyConsent />
              <FeedbackWidget />
            </NotificationProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
