import Link from "next/link";
import type { Metadata } from "next";
import {
  BookOpenIcon,
  LightBulbIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

// Move metadata to a separate file or remove the "use client" directive
export const metadata: Metadata = {
  title: "Relaxation Techniques | RealSleep",
  description:
    "Guided relaxation techniques to help you prepare for sleep and reduce anxiety",
};

interface NavLink {
  href: string;
  label: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
}

const navLinks: NavLink[] = [
  {
    href: "/relaxation/deep-breathing",
    label: "Deep Breathing",
    icon: SunIcon,
  },
  {
    href: "/relaxation/progressive-muscle-relaxation",
    label: "Progressive Muscle Relaxation",
    icon: BookOpenIcon,
  },
  {
    href: "/relaxation/visualization",
    label: "Visualization",
    icon: LightBulbIcon,
  },
];

export default function RelaxationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Relaxation Techniques</h1>

      {/* Navigation for relaxation techniques */}
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

      <div className="bg-card rounded-lg p-6 shadow-sm">{children}</div>
    </div>
  );
}
