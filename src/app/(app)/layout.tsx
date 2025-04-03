// app/(app)/layout.tsx
import Sidebar from "@/components/navigation/Sidebar";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <div className="container py-2 border-b border-border">
          <Breadcrumbs />
        </div>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
