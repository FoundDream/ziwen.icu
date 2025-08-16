import NavBar2 from "@/components/NavBar2";
import PageTransition from "@/components/PageTransition";
import { geistSans } from "@/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ziwen's blog",
  description: "A blog for ziwen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased bg-[#fafafa] text-gray-600`}
      >
        <div className="min-h-screen flex flex-col px-25">
          <div className="flex-1 flex min-h-screen relative">
            <div className="flex items-center mt-10 absolute top-0 left-0 z-20">
              <NavBar2 />
            </div>
            <PageTransition>{children}</PageTransition>
          </div>
          <footer className="w-full flex flex-col flex-wrap items-center justify-center py-4 text-xs">
            <p>© 2025 Made with ❤️</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
