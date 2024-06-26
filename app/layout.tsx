import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/themeContext";
import ToastProvider from "@/provider/ToastProvider";
import AuthSessionProvider from "@/components/AuthSessionProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tha Truth | Secret Messaging App",
  description: "Say the truth! Because this is the right place.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* <ToastProvider /> */}
          <Toaster />
          <AuthSessionProvider>
            {children}
          </AuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
