// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "@/hooks/useAuth"; // We'll add this import

export const metadata: Metadata = {
  title: "RealSleep - CBT-I Program",
  description:
    "A 12-week Cognitive Behavioral Therapy for Insomnia program to help improve your sleep patterns.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body suppressHydrationWarning={true}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
