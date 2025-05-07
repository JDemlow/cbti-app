// src/app/(app)/dashboard/layout.tsx
import { Metadata } from "next";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

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
  return (
    <ProtectedRoute>
      <div className="dashboard-layout">{children}</div>
    </ProtectedRoute>
  );
}
