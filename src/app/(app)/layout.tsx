// app/(app)/layout.tsx
import Sidebar from "@/components/navigation/Sidebar";
import DesktopSidebar from "@/components/navigation/DesktopSidebar";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar - only rendered on desktop */}
      <DesktopSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full">
        {/* Mobile Navigation - will only be visible on mobile */}
        <Sidebar />

        {/* Breadcrumbs - only visible on desktop */}
        <div className="hidden md:block container py-2 border-b border-border">
          <Breadcrumbs />
        </div>

        {/* Main content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
