"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  BookmarkIcon,
  ClockIcon,
  StarIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

// Define interface for relaxation technique
interface TechniqueCard {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  bestFor: string[];
  isFavorite?: boolean;
}

// Sample relaxation techniques data
const relaxationTechniques: TechniqueCard[] = [
  {
    id: "deep-breathing",
    title: "Deep Breathing",
    description:
      "A simple technique focusing on slow, deep breaths to activate your body's relaxation response.",
    duration: "5-10 min",
    difficulty: "easy",
    tags: ["breathing", "beginner", "anywhere"],
    bestFor: ["racing thoughts", "anxiety", "physical tension"],
  },
  {
    id: "progressive-muscle-relaxation",
    title: "Progressive Muscle Relaxation",
    description:
      "Systematically tense and release muscle groups to reduce physical tension and promote relaxation.",
    duration: "15-20 min",
    difficulty: "medium",
    tags: ["physical", "tension", "body-focused"],
    bestFor: ["physical tension", "stress", "difficulty falling asleep"],
  },
  {
    id: "body-scan",
    title: "Body Scan Meditation",
    description:
      "A mindfulness practice where you focus attention on different parts of your body from head to toe.",
    duration: "10-20 min",
    difficulty: "medium",
    tags: ["mindfulness", "awareness", "lying down"],
    bestFor: [
      "racing thoughts",
      "physical discomfort",
      "reconnecting with body",
    ],
  },
  {
    id: "visualization",
    title: "Peaceful Place Visualization",
    description:
      "Create a detailed mental image of a peaceful, safe place to promote feelings of calm and security.",
    duration: "10-15 min",
    difficulty: "medium",
    tags: ["imagery", "mental", "calming"],
    bestFor: ["anxiety", "worry", "stress before bed"],
  },
  {
    id: "478-breathing",
    title: "4-7-8 Breathing Technique",
    description:
      "A structured breathing pattern that helps calm the nervous system and prepare for sleep.",
    duration: "5 min",
    difficulty: "easy",
    tags: ["breathing", "quick", "anywhere"],
    bestFor: ["insomnia", "anxiety", "racing thoughts"],
  },
  {
    id: "gratitude",
    title: "Bedtime Gratitude Practice",
    description:
      "Focus on positive aspects of your day to shift attention away from worries and promote positive emotions.",
    duration: "5-10 min",
    difficulty: "easy",
    tags: ["positive psychology", "mental", "evening"],
    bestFor: ["worry", "negative thoughts", "stress"],
  },
  {
    id: "mindful-breathing",
    title: "Mindful Breathing",
    description:
      "Focus your attention on your breath, noticing sensations without trying to change them.",
    duration: "10-15 min",
    difficulty: "medium",
    tags: ["mindfulness", "awareness", "meditation"],
    bestFor: ["racing mind", "anxiety", "improving awareness"],
  },
  {
    id: "counting-down",
    title: "Sleep Countdown",
    description:
      "Count backwards from 100, pacing your breath with each number to quiet the mind.",
    duration: "5-10 min",
    difficulty: "easy",
    tags: ["mental", "in bed", "simple"],
    bestFor: ["racing thoughts", "difficulty falling asleep", "mind chatter"],
  },
];

// Filter options
type FilterOption =
  | "all"
  | "easy"
  | "quick"
  | "sleep-onset"
  | "anxiety"
  | "favorite";

export default function RelaxationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");
  const [favorites, setFavorites] = useState<string[]>([]);

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Filter techniques based on active filter
  const getFilteredTechniques = () => {
    let filtered = relaxationTechniques;

    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (technique) =>
          technique.title.toLowerCase().includes(query) ||
          technique.description.toLowerCase().includes(query) ||
          technique.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          technique.bestFor.some((benefit) =>
            benefit.toLowerCase().includes(query)
          )
      );
    }

    // Apply category filter
    switch (activeFilter) {
      case "easy":
        filtered = filtered.filter((t) => t.difficulty === "easy");
        break;
      case "quick":
        filtered = filtered.filter(
          (t) => t.duration.includes("5") || t.duration.includes("10")
        );
        break;
      case "sleep-onset":
        filtered = filtered.filter(
          (t) =>
            t.bestFor.includes("difficulty falling asleep") ||
            t.bestFor.includes("insomnia")
        );
        break;
      case "anxiety":
        filtered = filtered.filter(
          (t) =>
            t.bestFor.includes("anxiety") ||
            t.bestFor.includes("racing thoughts")
        );
        break;
      case "favorite":
        filtered = filtered.filter((t) => favorites.includes(t.id));
        break;
      default:
        // "all" case - no additional filtering
        break;
    }

    // Add favorite status to each technique
    return filtered.map((technique) => ({
      ...technique,
      isFavorite: favorites.includes(technique.id),
    }));
  };

  const filteredTechniques = getFilteredTechniques();

  const FilterButton = ({
    filter,
    label,
  }: {
    filter: FilterOption;
    label: string;
  }) => (
    <button
      onClick={() => setActiveFilter(filter)}
      className={`px-3 py-1.5 text-sm rounded-md whitespace-nowrap ${
        activeFilter === filter
          ? "bg-primary text-white"
          : "bg-muted hover:bg-muted/80 text-foreground"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Relaxation Techniques</h1>
          <p className="text-muted-foreground">
            Evidence-based methods to help you unwind and prepare for sleep
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md w-full">
          <input
            type="text"
            placeholder="Search techniques..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm pr-10"
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
            {filteredTechniques.length}
          </span>
        </div>
      </div>

      {/* Filter Tabs - Horizontally scrollable on mobile */}
      <div className="mb-6 overflow-x-auto pb-2">
        <div className="flex space-x-2">
          <FilterButton filter="all" label="All Techniques" />
          <FilterButton filter="easy" label="Easy for Beginners" />
          <FilterButton filter="quick" label="Quick (5-10 min)" />
          <FilterButton filter="sleep-onset" label="For Sleep Onset" />
          <FilterButton filter="anxiety" label="For Anxiety" />
          <FilterButton filter="favorite" label="My Favorites" />
        </div>
      </div>

      {/* Best For Section - quick links to specific problems */}
      <div className="mb-6 bg-muted p-4 rounded-lg">
        <h2 className="text-lg font-medium mb-3">I need help with...</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              problem: "Falling Asleep",
              icon: <MoonIcon className="w-5 h-5" />,
              filter: "sleep-onset" as const,
            },
            {
              problem: "Racing Thoughts",
              icon: <SunIcon className="w-5 h-5" />,
              filter: "anxiety" as const,
            },
            {
              problem: "Relaxing My Body",
              icon: <StarIcon className="w-5 h-5" />,
              filter: "all" as const,
            },
            {
              problem: "Just Getting Started",
              icon: <BookmarkIcon className="w-5 h-5" />,
              filter: "easy" as const,
            },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveFilter(item.filter)}
              className="flex items-center p-3 bg-card rounded-md border border-border hover:border-primary transition-colors"
            >
              <span className="text-primary mr-2">{item.icon}</span>
              <span className="text-sm font-medium">{item.problem}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Techniques Grid */}
      {filteredTechniques.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium mb-2">No techniques found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filter settings
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveFilter("all");
            }}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTechniques.map((technique) => (
            <div
              key={technique.id}
              className="bg-card border border-border rounded-lg overflow-hidden transition-shadow hover:shadow-md"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{technique.title}</h3>
                  <button
                    onClick={() => toggleFavorite(technique.id)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={
                      technique.isFavorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                  >
                    <BookmarkIcon
                      className={`w-5 h-5 ${
                        technique.isFavorite
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                </div>

                <p className="text-muted-foreground text-sm mb-4">
                  {technique.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                    <ClockIcon className="w-3 h-3 mr-1" />
                    {technique.duration}
                  </span>

                  <span
                    className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                      technique.difficulty === "easy"
                        ? "bg-success/10 text-success"
                        : technique.difficulty === "medium"
                          ? "bg-warning/10 text-warning"
                          : "bg-error/10 text-error"
                    }`}
                  >
                    {technique.difficulty === "easy"
                      ? "Beginner"
                      : technique.difficulty === "medium"
                        ? "Intermediate"
                        : "Advanced"}
                  </span>
                </div>

                <div className="mb-4">
                  <h4 className="text-xs text-muted-foreground uppercase mb-1">
                    Best for:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {technique.bestFor.map((benefit, index) => (
                      <span
                        key={index}
                        className="text-xs bg-muted px-2 py-1 rounded"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/relaxation/${technique.id}`}
                  className="flex items-center justify-center w-full px-4 py-2 mt-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                >
                  Start Technique <ArrowRightIcon className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
