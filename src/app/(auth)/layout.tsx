import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | RealSleep CBT-I Program",
  description: "Sign in or create an account for the RealSleep CBT-I Program",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
