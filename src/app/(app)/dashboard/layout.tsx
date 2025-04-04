// app/dashboard/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | RealSleep CBT-I Program",
  description:
    "Track your sleep progress, complete daily tasks, and follow your CBT-I program.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="dashboard-layout">{children}</div>;
}
