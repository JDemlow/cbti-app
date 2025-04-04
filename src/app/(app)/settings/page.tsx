// app/(app)/settings/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

  // Redirect to account settings by default
  useEffect(() => {
    router.push("/settings/account");
  }, [router]);

  return (
    <div className="container py-6">
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading settings...</div>
      </div>
    </div>
  );
}
