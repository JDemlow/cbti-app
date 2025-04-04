// app/(app)/settings/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | RealSleep",
  description: "Manage your account settings and preferences",
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="settings-layout">{children}</div>;
}
