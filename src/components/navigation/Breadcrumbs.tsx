// components/navigation/Breadcrumbs.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/outline";

interface BreadcrumbProps {
  homeElement?: React.ReactNode;
  separator?: React.ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
}

export default function Breadcrumbs({
  homeElement = <HomeIcon className="w-4 h-4" />,
  separator = <ChevronRightIcon className="w-4 h-4 text-muted-foreground" />,
  containerClasses = "py-3 flex",
  listClasses = "flex items-center gap-1 text-sm",
  activeClasses = "text-primary font-medium",
  capitalizeLinks = true,
}: BreadcrumbProps) {
  const paths = usePathname();

  // Skip rendering if we're on the home page
  if (paths === "/") {
    return null;
  }

  const pathNames = paths.split("/").filter((path) => path);

  // Define path mappings for better display names
  const pathMappings: { [key: string]: string } = {
    dashboard: "Dashboard",
    diary: "Sleep Diary",
    progress: "Progress",
    program: "Program",
    relaxation: "Relaxation",
    settings: "Settings",
    help: "Help",
    profile: "Profile",
  };

  return (
    <div className={containerClasses}>
      <ul className={listClasses}>
        <li className="flex items-center">
          <Link href="/" className="hover:text-primary transition-colors">
            {homeElement}
          </Link>
        </li>
        {pathNames.length > 0 && (
          <li className="flex items-center">{separator}</li>
        )}

        {pathNames.map((name, index) => {
          const routeTo = `/${pathNames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathNames.length - 1;

          // Check if we have a custom mapping for this path
          let displayName = pathMappings[name] || name;

          // If no custom mapping and we want to capitalize
          if (!pathMappings[name] && capitalizeLinks) {
            displayName = name.charAt(0).toUpperCase() + name.slice(1);

            // Replace hyphens with spaces and capitalize each word
            displayName = displayName
              .replace(/-/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase());
          }

          return (
            <li key={name} className="flex items-center">
              {isLast ? (
                <span className={activeClasses}>{displayName}</span>
              ) : (
                <>
                  <Link
                    href={routeTo}
                    className="hover:text-primary transition-colors"
                  >
                    {displayName}
                  </Link>
                  <span className="flex items-center mx-1">{separator}</span>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
