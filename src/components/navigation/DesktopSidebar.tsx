// components/navigation/DesktopSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/theme/ThemeToggle";
import {
  HomeIcon,
  // CalendarIcon,
  ChartBarIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  BellIcon,
  MoonIcon,
  QuestionMarkCircleIcon,
  PowerIcon,
  UserIcon,
  AcademicCapIcon,
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
  { name: "Learn", href: "/learn", icon: AcademicCapIcon }, // New Learn link
  { name: "Profile", href: "/profile", icon: UserIcon },
  { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
  { name: "Help", href: "/help", icon: QuestionMarkCircleIcon },
];

export default function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:flex-col w-64 bg-card border-r border-border h-screen">
      <div className="p-4 flex items-center justify-between border-b border-border">
        <div className="text-xl font-bold text-primary">RealSleep</div>
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
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <span className="text-sm">Light/Dark Mode</span>
        </div>
      </div>

      {/* Log Out */}
      <div className="p-4 border-t border-border">
        <button className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors">
          <PowerIcon className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </div>
  );
}
