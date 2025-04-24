// filepath: /home/syeda/foxo/mini-note-app/src/app/layout.tsx
"use client";

import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800 font-sans">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <main className="container mx-auto p-6">{children}</main>
        </QueryClientProvider>
      </body>
    </html>
  );
}