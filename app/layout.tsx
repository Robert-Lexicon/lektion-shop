import type { Metadata } from "next";
import { Geist, Geist_Mono, Quicksand } from "next/font/google";
import "./globals.css";
import NavMain from "@/components/navigation/nav-main";
import CartProvider from "@/providers/cart-provider";
import { Toaster } from "@/components/ui/sonner";
import CartButton from "@/components/products/cart-button";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

//static metadata
export const metadata: Metadata = {
  title: "FakeStore tm",
  description: "A fake store for fake people from a fake api",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${quicksand.variable}`}
      >
        <CartProvider>
          <header className="bg-zinc-200 py-2 px-4">
            <div className="container flex justify-between space-x-1 mx-auto">
              <NavMain />
              <CartButton />
            </div>
          </header>
          <div className="my-8 mx-4 ">{children}</div>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
