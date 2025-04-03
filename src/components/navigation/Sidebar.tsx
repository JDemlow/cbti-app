// components/navigation/Sidebar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  // CalendarIcon,
  ChartBarIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  BellIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
  QuestionMarkCircleIcon,
  // UserIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

interface NavItem {
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Sleep Diary", href: "/diary", icon: MoonIcon },
  { name: "Progress", href: "/progress", icon: ChartBarIcon },
  { name: "Program", href: "/program", icon: BookOpenIcon },
  { name: "Relaxation", href: "/relaxation", icon: BellIcon },
  { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
  { name: "Help", href: "/help", icon: QuestionMarkCircleIcon },
];

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Check if we're on the client-side and update based on window size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden bg-card border-b border-border">
        <div className="container py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-primary">SleepWell</div>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md hover:bg-muted transition-colors"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`
          fixed top-0 bottom-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:h-screen md:flex md:flex-col
        `}
      >
        <div className="p-4 flex items-center justify-between border-b border-border">
          <div className="text-xl font-bold text-primary">SleepWell</div>
          {isMobile && (
            <button
              onClick={toggleMobileMenu}
              className="p-1 rounded-md hover:bg-muted transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white">
              A
            </div>
            <div>
              <div className="font-medium">Alex Johnson</div>
              <div className="text-sm text-muted-foreground">Week 3</div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted text-foreground hover:text-primary"
                  }
                `}
                onClick={isMobile ? toggleMobileMenu : undefined}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Log Out */}
        <div className="p-4 border-t border-border">
          <button className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors">
            <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
            Log Out
          </button>
        </div>
      </div>
    </>
  );
}
