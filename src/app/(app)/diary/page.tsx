// app/(app)/diary/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PlusIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

// Mock data for sleep diary entries
const mockDiaryEntries = [
  {
    id: "1",
    date: "2023-03-31",
    bedTime: "22:30",
    fallAsleepTime: "23:00",
    wakeTime: "06:45",
    getUpTime: "07:15",
    awakenings: 2,
    totalAwakeTime: 25,
    sleepQuality: 3,
    restedness: 2,
    mood: 3,
    notes: "Had coffee late in the afternoon, might have affected sleep",
    timeInBed: "8h 45m",
    totalSleepTime: "6h 20m",
    sleepEfficiency: 73,
  },
  {
    id: "2",
    date: "2023-03-30",
    bedTime: "23:00",
    fallAsleepTime: "23:30",
    wakeTime: "07:00",
    getUpTime: "07:30",
    awakenings: 1,
    totalAwakeTime: 15,
    sleepQuality: 4,
    restedness: 3,
    mood: 4,
    notes: "",
    timeInBed: "8h 30m",
    totalSleepTime: "7h 15m",
    sleepEfficiency: 85,
  },
  {
    id: "3",
    date: "2023-03-29",
    bedTime: "22:15",
    fallAsleepTime: "22:45",
    wakeTime: "06:30",
    getUpTime: "06:45",
    awakenings: 3,
    totalAwakeTime: 40,
    sleepQuality: 2,
    restedness: 2,
    mood: 2,
    notes: "Stressful day at work, had trouble staying asleep",
    timeInBed: "8h 30m",
    totalSleepTime: "6h 5m",
    sleepEfficiency: 71,
  },
  {
    id: "4",
    date: "2023-03-28",
    bedTime: "22:45",
    fallAsleepTime: "23:00",
    wakeTime: "06:15",
    getUpTime: "06:30",
    awakenings: 0,
    totalAwakeTime: 0,
    sleepQuality: 5,
    restedness: 4,
    mood: 4,
    notes: "Exercised in the morning, felt tired by bedtime",
    timeInBed: "7h 45m",
    totalSleepTime: "7h 15m",
    sleepEfficiency: 93,
  },
  {
    id: "5",
    date: "2023-03-27",
    bedTime: "23:15",
    fallAsleepTime: "00:00",
    wakeTime: "06:45",
    getUpTime: "07:00",
    awakenings: 1,
    totalAwakeTime: 20,
    sleepQuality: 3,
    restedness: 3,
    mood: 3,
    notes: "",
    timeInBed: "7h 45m",
    totalSleepTime: "6h 25m",
    sleepEfficiency: 83,
  },
];

export default function DiaryPage() {
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);
  const [filterMonth, setFilterMonth] = useState<string | null>(null);

  const toggleEntryExpand = (id: string) => {
    if (expandedEntry === id) {
      setExpandedEntry(null);
    } else {
      setExpandedEntry(id);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderQualityStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((value) => (
          <SunIcon
            key={value}
            className={`w-4 h-4 ${value <= rating ? "text-warning" : "text-muted-foreground/30"}`}
          />
        ))}
      </div>
    );
  };

  // Calculate averages for the displayed entries
  const calculateAverages = () => {
    if (mockDiaryEntries.length === 0)
      return { avgSleepTime: "N/A", avgSleepQuality: 0, avgEfficiency: 0 };

    const totalSleepTimes = mockDiaryEntries.map((entry) => {
      const [hours, minutes] = entry.totalSleepTime.split("h ");
      return parseInt(hours) * 60 + parseInt(minutes.replace("m", ""));
    });

    const avgSleepTimeMinutes =
      totalSleepTimes.reduce((acc, val) => acc + val, 0) /
      mockDiaryEntries.length;
    const avgSleepTimeHours = Math.floor(avgSleepTimeMinutes / 60);
    const avgSleepTimeRemainingMinutes = Math.round(avgSleepTimeMinutes % 60);

    const avgSleepQuality =
      mockDiaryEntries.reduce((acc, entry) => acc + entry.sleepQuality, 0) /
      mockDiaryEntries.length;
    const avgEfficiency =
      mockDiaryEntries.reduce((acc, entry) => acc + entry.sleepEfficiency, 0) /
      mockDiaryEntries.length;

    return {
      avgSleepTime: `${avgSleepTimeHours}h ${avgSleepTimeRemainingMinutes}m`,
      avgSleepQuality: Math.round(avgSleepQuality * 10) / 10,
      avgEfficiency: Math.round(avgEfficiency),
    };
  };

  const averages = calculateAverages();

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sleep Diary</h1>
        <Link
          href="/diary/new"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          New Entry
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="col-span-3">
          {/* Sleep Summary Card */}
          <div className="bg-card rounded-lg shadow-sm p-4 mb-6">
            <h2 className="text-lg font-semibold mb-4">Recent Sleep Summary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-muted rounded-md p-3">
                <div className="text-sm text-muted-foreground">
                  Avg. Sleep Time
                </div>
                <div className="text-xl font-medium">
                  {averages.avgSleepTime}
                </div>
              </div>

              <div className="bg-muted rounded-md p-3">
                <div className="text-sm text-muted-foreground">
                  Avg. Sleep Quality
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-medium">
                    {averages.avgSleepQuality}
                  </span>
                  {renderQualityStars(Math.round(averages.avgSleepQuality))}
                </div>
              </div>

              <div className="bg-muted rounded-md p-3">
                <div className="text-sm text-muted-foreground">
                  Avg. Sleep Efficiency
                </div>
                <div className="text-xl font-medium">
                  {averages.avgEfficiency}%
                </div>
              </div>
            </div>
          </div>

          {/* Diary Entries */}
          <div className="bg-card rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h2 className="font-semibold flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                Sleep Diary Entries
              </h2>

              <select
                className="px-3 py-1 rounded-md border border-input bg-background text-sm"
                value={filterMonth || ""}
                onChange={(e) => setFilterMonth(e.target.value || null)}
              >
                <option value="">All Entries</option>
                <option value="2023-03">March 2023</option>
                <option value="2023-02">February 2023</option>
                <option value="2023-01">January 2023</option>
              </select>
            </div>

            <div className="divide-y divide-border">
              {mockDiaryEntries.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  No diary entries found. Start tracking your sleep by adding a
                  new entry.
                </div>
              ) : (
                mockDiaryEntries.map((entry) => (
                  <div key={entry.id} className="divide-y divide-border/50">
                    <div
                      className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => toggleEntryExpand(entry.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="font-medium">
                            {formatDate(entry.date)}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            {entry.totalSleepTime}
                          </div>
                          {renderQualityStars(entry.sleepQuality)}
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-md">
                            {entry.sleepEfficiency}% efficient
                          </div>
                          {expandedEntry === entry.id ? (
                            <ChevronUpIcon className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronDownIcon className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </div>

                    {expandedEntry === entry.id && (
                      <div className="p-4 bg-muted/30">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-sm font-medium mb-3 flex items-center">
                              <MoonIcon className="w-4 h-4 mr-1 text-primary" />
                              Bedtime Details
                            </h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Bedtime:
                                </span>
                                <span>{entry.bedTime}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Fall asleep time:
                                </span>
                                <span>{entry.fallAsleepTime}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Time to fall asleep:
                                </span>
                                <span>
                                  {(() => {
                                    const bedParts = entry.bedTime
                                      .split(":")
                                      .map(Number);
                                    const fallAsleepParts = entry.fallAsleepTime
                                      .split(":")
                                      .map(Number);

                                    const bedMinutes =
                                      bedParts[0] * 60 + bedParts[1];
                                    let fallAsleepMinutes =
                                      fallAsleepParts[0] * 60 +
                                      fallAsleepParts[1];

                                    // Adjust if crossing midnight
                                    if (fallAsleepMinutes < bedMinutes) {
                                      fallAsleepMinutes += 24 * 60;
                                    }

                                    const diff = fallAsleepMinutes - bedMinutes;
                                    return `${diff} minutes`;
                                  })()}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium mb-3 flex items-center">
                              <SunIcon className="w-4 h-4 mr-1 text-warning" />
                              Wake Details
                            </h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Wake time:
                                </span>
                                <span>{entry.wakeTime}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Get up time:
                                </span>
                                <span>{entry.getUpTime}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Time in bed after waking:
                                </span>
                                <span>
                                  {(() => {
                                    const wakeParts = entry.wakeTime
                                      .split(":")
                                      .map(Number);
                                    const getUpParts = entry.getUpTime
                                      .split(":")
                                      .map(Number);

                                    const wakeMinutes =
                                      wakeParts[0] * 60 + wakeParts[1];
                                    let getUpMinutes =
                                      getUpParts[0] * 60 + getUpParts[1];

                                    // Adjust if crossing midnight
                                    if (getUpMinutes < wakeMinutes) {
                                      getUpMinutes += 24 * 60;
                                    }

                                    const diff = getUpMinutes - wakeMinutes;
                                    return `${diff} minutes`;
                                  })()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h3 className="text-sm font-medium mb-2">
                              Night Awakenings
                            </h3>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Number of awakenings:
                                </span>
                                <span>{entry.awakenings}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Total time awake:
                                </span>
                                <span>{entry.totalAwakeTime} minutes</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium mb-2">
                              Sleep Quality
                            </h3>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Sleep quality:
                                </span>
                                <span className="flex">
                                  {renderQualityStars(entry.sleepQuality)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Refreshed feeling:
                                </span>
                                <span className="flex">
                                  {renderQualityStars(entry.restedness)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Morning mood:
                                </span>
                                <span className="flex">
                                  {renderQualityStars(entry.mood)}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium mb-2">
                              Sleep Metrics
                            </h3>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Time in bed:
                                </span>
                                <span>{entry.timeInBed}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Total sleep time:
                                </span>
                                <span>{entry.totalSleepTime}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Sleep efficiency:
                                </span>
                                <span>{entry.sleepEfficiency}%</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {entry.notes && (
                          <div className="mt-4 p-3 bg-muted rounded-md">
                            <h3 className="text-sm font-medium mb-1">Notes</h3>
                            <p className="text-sm text-muted-foreground">
                              {entry.notes}
                            </p>
                          </div>
                        )}

                        <div className="mt-4 pt-2 border-t border-border flex justify-end">
                          <Link
                            href={`/diary/edit/${entry.id}`}
                            className="text-sm text-primary hover:underline"
                          >
                            Edit entry
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          {/* Tips Card */}
          <div className="bg-card rounded-lg shadow-sm p-4 sticky top-6">
            <h2 className="text-lg font-semibold mb-4">
              Tips for Accurate Logging
            </h2>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted rounded-md">
                <p className="font-medium mb-1">Log consistently</p>
                <p className="text-muted-foreground">
                  Try to fill out your sleep diary each morning while your sleep
                  is still fresh in your mind.
                </p>
              </div>

              <div className="p-3 bg-muted rounded-md">
                <p className="font-medium mb-1">Estimate if necessary</p>
                <p className="text-muted-foreground">
                  If you&apos;re not sure exactly when you fell asleep, make
                  your best guess rather than skipping the entry.
                </p>
              </div>

              <div className="p-3 bg-muted rounded-md">
                <p className="font-medium mb-1">Note influencing factors</p>
                <p className="text-muted-foreground">
                  Record any factors that might have affected your sleep like
                  caffeine, stress, or exercise.
                </p>
              </div>

              <div className="p-3 bg-muted rounded-md">
                <p className="font-medium mb-1">Don&apos;t watch the clock</p>
                <p className="text-muted-foreground">
                  Checking the time throughout the night can increase sleep
                  anxiety. Try to avoid this.
                </p>
              </div>

              <div className="mt-6">
                <Link
                  href="/learn/sleep-hygiene"
                  className="text-primary hover:underline text-sm"
                >
                  View more sleep hygiene tips
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
