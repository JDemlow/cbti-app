// app/(app)/learn/layout.tsx
import Link from "next/link";
import type { Metadata } from "next";
import {
  BookOpenIcon,
  LightBulbIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Learn | RealSleep",
  description:
    "Educational resources and information about CBT-I and sleep improvement",
};

interface NavLink {
  href: string;
  label: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
}

const navLinks: NavLink[] = [
  {
    href: "/learn/cbt-i",
    label: "CBT-I Basics",
    icon: BookOpenIcon,
  },
  {
    href: "/learn/sleep-hygiene",
    label: "Sleep Hygiene",
    icon: LightBulbIcon,
  },
  {
    href: "/learn/faq",
    label: "FAQ",
    icon: QuestionMarkCircleIcon,
  },
];

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Learn About Sleep</h1>

      {/* Education Navigation */}
      <div className="flex mb-8 border-b border-border overflow-x-auto pb-1">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`
              px-4 py-2 font-medium mr-2 flex items-center gap-2 whitespace-nowrap
              hover:text-primary transition-colors
            `}
          >
            <link.icon className="w-5 h-5" />
            <span>{link.label}</span>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar for Desktop */}
        <div className="hidden lg:block">
          <div className="bg-card rounded-lg p-4 shadow-sm sticky top-6">
            <h2 className="font-medium text-lg mb-4">Educational Resources</h2>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm hover:text-primary transition-colors p-2 rounded-md hover:bg-muted"
                  >
                    <link.icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-border">
              <h3 className="font-medium mb-2">Additional Resources</h3>
              <ul className="space-y-1">
                <li>
                  <a
                    href="https://www.sleepfoundation.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    National Sleep Foundation
                  </a>
                </li>
                <li>
                  <a
                    href="https://sleepeducation.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    American Academy of Sleep Medicine
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-card rounded-lg p-6 shadow-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
