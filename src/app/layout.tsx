import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";

const notoSansBengali = Noto_Sans_Bengali({ 
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mixed ERP System",
  description: "Dawat IT Mixed ERP Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={`${notoSansBengali.className} bg-gray-50 text-gray-900 flex h-screen overflow-hidden antialiased`}>
        <Sidebar />
        <main className="flex-1 ml-64 flex flex-col h-screen overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
