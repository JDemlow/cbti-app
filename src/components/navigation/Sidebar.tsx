// components/navigation/Sidebar.tsx
"use client";

import { useState } from "react";
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
  PowerIcon,
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
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Header - Always visible on mobile */}
      <div className="md:hidden border-b border-border">
        <div className="container py-4 flex items-center justify-between">
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md hover:bg-muted transition-colors"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
          {/* Empty space to balance the header */}
          <div></div>
        </div>
      </div>

      {/* Mobile Menu Overlay - only shown when menu is open */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Menu - only shown when menu is open */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-card shadow-lg">
          <div className="p-4 flex items-center justify-between border-b border-border">
            <div className="text-xl font-bold text-primary">RealSleep</div>
            <button
              onClick={toggleMobileMenu}
              className="p-1 rounded-md hover:bg-muted transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
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
                  onClick={toggleMobileMenu}
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
              <PowerIcon className="w-5 h-5" />
              Log Out
            </button>
          </div>
        </div>
      )}
    </>
  );
}
