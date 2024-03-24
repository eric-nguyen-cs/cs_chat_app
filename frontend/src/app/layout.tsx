import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/services/auth";
import { SocketProvider } from "@/services/socket";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CS Chat App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <SocketProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </SocketProvider>
    </AuthProvider>
  );
}
