// app/(app)/diary/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeftIcon,
  MoonIcon,
  SunIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

// Get current date and format it for the input
const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Get yesterday's date for default log
const getYesterdayDate = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, "0");
  const day = String(yesterday.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function NewSleepDiaryPage() {
  const router = useRouter();

  // State for form fields
  const [date, setDate] = useState(getYesterdayDate());
  const [bedTime, setBedTime] = useState("22:30");
  const [fallAsleepTime, setFallAsleepTime] = useState("23:00");
  const [wakeTime, setWakeTime] = useState("07:00");
  const [getUpTime, setGetUpTime] = useState("07:15");
  const [awakenings, setAwakenings] = useState(0);
  const [totalAwakeTime, setTotalAwakeTime] = useState(0);
  const [sleepQuality, setSleepQuality] = useState(3);
  const [restedness, setRestedness] = useState(3);
  const [mood, setMood] = useState(3);
  const [notes, setNotes] = useState("");

  // State for loading status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate some metrics
  const calculateTimeInBed = () => {
    try {
      const bedTimeParts = bedTime.split(":").map(Number);
      const getUpTimeParts = getUpTime.split(":").map(Number);

      // Convert to minutes since midnight
      const bedTimeMinutes = bedTimeParts[0] * 60 + bedTimeParts[1];
      let getUpTimeMinutes = getUpTimeParts[0] * 60 + getUpTimeParts[1];

      // Adjust if crossing midnight
      if (getUpTimeMinutes < bedTimeMinutes) {
        getUpTimeMinutes += 24 * 60;
      }

      const totalMinutes = getUpTimeMinutes - bedTimeMinutes;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      return `${hours}h ${minutes}m`;
    } catch (error) {
      console.error("Error calculating time in bed:", error);
      return "N/A";
    }
  };

  const calculateTotalSleepTime = () => {
    try {
      const fallAsleepTimeParts = fallAsleepTime.split(":").map(Number);
      const wakeTimeParts = wakeTime.split(":").map(Number);

      // Convert to minutes since midnight
      const fallAsleepTimeMinutes =
        fallAsleepTimeParts[0] * 60 + fallAsleepTimeParts[1];
      let wakeTimeMinutes = wakeTimeParts[0] * 60 + wakeTimeParts[1];

      // Adjust if crossing midnight
      if (wakeTimeMinutes < fallAsleepTimeMinutes) {
        wakeTimeMinutes += 24 * 60;
      }

      const totalMinutes =
        wakeTimeMinutes - fallAsleepTimeMinutes - totalAwakeTime;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      return `${hours}h ${minutes}m`;
    } catch (error) {
      console.error("Error calculating total sleep time:", error);
      return "N/A";
    }
  };

  const calculateSleepEfficiency = () => {
    try {
      const bedTimeParts = bedTime.split(":").map(Number);
      const getUpTimeParts = getUpTime.split(":").map(Number);
      const fallAsleepTimeParts = fallAsleepTime.split(":").map(Number);
      const wakeTimeParts = wakeTime.split(":").map(Number);

      // Convert to minutes since midnight
      const bedTimeMinutes = bedTimeParts[0] * 60 + bedTimeParts[1];
      let getUpTimeMinutes = getUpTimeParts[0] * 60 + getUpTimeParts[1];
      const fallAsleepTimeMinutes =
        fallAsleepTimeParts[0] * 60 + fallAsleepTimeParts[1];
      let wakeTimeMinutes = wakeTimeParts[0] * 60 + wakeTimeParts[1];

      // Adjust if crossing midnight
      if (getUpTimeMinutes < bedTimeMinutes) {
        getUpTimeMinutes += 24 * 60;
      }
      if (wakeTimeMinutes < fallAsleepTimeMinutes) {
        wakeTimeMinutes += 24 * 60;
      }

      const timeInBed = getUpTimeMinutes - bedTimeMinutes;
      const totalSleepTime =
        wakeTimeMinutes - fallAsleepTimeMinutes - totalAwakeTime;

      const efficiency = (totalSleepTime / timeInBed) * 100;
      return Math.round(efficiency);
    } catch (error) {
      console.error("Error calculating sleep efficiency:", error);
      return "N/A";
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create the diary entry object
    const diaryEntry = {
      date,
      bedTime,
      fallAsleepTime,
      wakeTime,
      getUpTime,
      awakenings,
      totalAwakeTime,
      sleepQuality,
      restedness,
      mood,
      notes,
      timeInBed: calculateTimeInBed(),
      totalSleepTime: calculateTotalSleepTime(),
      sleepEfficiency: calculateSleepEfficiency(),
    };

    // In a real app, you would send this to your backend
    console.log("Submitting sleep diary entry:", diaryEntry);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // After successful submission, redirect to the diary list
      router.push("/diary");
    }, 1000);
  };

  const navigateDay = (direction: "prev" | "next") => {
    const currentDate = new Date(date);
    if (direction === "prev") {
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    setDate(`${year}-${month}-${day}`);
  };

  const formatDisplayDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container py-6">
      <div className="flex items-center mb-6">
        <Link
          href="/diary"
          className="p-2 rounded-md hover:bg-muted transition-colors mr-2"
          aria-label="Back to sleep diary"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold">New Sleep Diary Entry</h1>
      </div>

      <div className="bg-card rounded-lg p-6 shadow-sm">
        <form onSubmit={handleSubmit}>
          {/* Date Selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                onClick={() => navigateDay("prev")}
                className="p-2 hover:bg-muted rounded-md transition-colors"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>

              <div className="text-lg font-medium">
                {formatDisplayDate(date)}
              </div>

              <button
                type="button"
                onClick={() => navigateDay("next")}
                className="p-2 hover:bg-muted rounded-md transition-colors"
                disabled={new Date(date) >= new Date(getCurrentDate())}
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>

            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={getCurrentDate()}
              className="sr-only"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Bedtime Section */}
            <div className="bg-muted p-4 rounded-md">
              <h2 className="flex items-center text-lg font-semibold mb-4">
                <MoonIcon className="w-5 h-5 mr-2 text-primary" />
                Bedtime
              </h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="bedTime"
                    className="block text-sm font-medium text-muted-foreground mb-1"
                  >
                    When did you get into bed?
                  </label>
                  <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 text-muted-foreground mr-2" />
                    <input
                      type="time"
                      id="bedTime"
                      value={bedTime}
                      onChange={(e) => setBedTime(e.target.value)}
                      required
                      className="rounded-md border border-input bg-background px-3 py-2"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="fallAsleepTime"
                    className="block text-sm font-medium text-muted-foreground mb-1"
                  >
                    When did you fall asleep?
                  </label>
                  <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 text-muted-foreground mr-2" />
                    <input
                      type="time"
                      id="fallAsleepTime"
                      value={fallAsleepTime}
                      onChange={(e) => setFallAsleepTime(e.target.value)}
                      required
                      className="rounded-md border border-input bg-background px-3 py-2"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Wake Time Section */}
            <div className="bg-muted p-4 rounded-md">
              <h2 className="flex items-center text-lg font-semibold mb-4">
                <SunIcon className="w-5 h-5 mr-2 text-warning" />
                Wake Time
              </h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="wakeTime"
                    className="block text-sm font-medium text-muted-foreground mb-1"
                  >
                    When did you wake up?
                  </label>
                  <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 text-muted-foreground mr-2" />
                    <input
                      type="time"
                      id="wakeTime"
                      value={wakeTime}
                      onChange={(e) => setWakeTime(e.target.value)}
                      required
                      className="rounded-md border border-input bg-background px-3 py-2"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="getUpTime"
                    className="block text-sm font-medium text-muted-foreground mb-1"
                  >
                    When did you get out of bed?
                  </label>
                  <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 text-muted-foreground mr-2" />
                    <input
                      type="time"
                      id="getUpTime"
                      value={getUpTime}
                      onChange={(e) => setGetUpTime(e.target.value)}
                      required
                      className="rounded-md border border-input bg-background px-3 py-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Night Awakenings */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Night Awakenings</h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="awakenings"
                    className="block text-sm font-medium text-muted-foreground mb-1"
                  >
                    How many times did you wake up during the night?
                  </label>
                  <input
                    type="number"
                    id="awakenings"
                    min="0"
                    value={awakenings}
                    onChange={(e) => setAwakenings(parseInt(e.target.value))}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="totalAwakeTime"
                    className="block text-sm font-medium text-muted-foreground mb-1"
                  >
                    Total time awake during the night (minutes)
                  </label>
                  <input
                    type="number"
                    id="totalAwakeTime"
                    min="0"
                    value={totalAwakeTime}
                    onChange={(e) =>
                      setTotalAwakeTime(parseInt(e.target.value))
                    }
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  />
                </div>
              </div>
            </div>

            {/* Sleep Quality Ratings */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Sleep Quality</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    How would you rate your sleep quality?
                  </label>
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Poor</span>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setSleepQuality(value)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            sleepQuality === value
                              ? "bg-primary text-white"
                              : "bg-muted hover:bg-muted/80"
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                    <span className="text-xs">Excellent</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    How refreshed did you feel when you woke up?
                  </label>
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Not at all</span>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setRestedness(value)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            restedness === value
                              ? "bg-primary text-white"
                              : "bg-muted hover:bg-muted/80"
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                    <span className="text-xs">Very refreshed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mood Rating */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Morning Mood</h2>

            <label className="block text-sm font-medium text-muted-foreground mb-2">
              How would you rate your mood when you woke up?
            </label>
            <div className="flex justify-between items-center max-w-md mx-auto">
              <span className="text-xs">Very negative</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setMood(value)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      mood === value
                        ? "bg-primary text-white"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <span className="text-xs">Very positive</span>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-8">
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-muted-foreground mb-1"
            >
              Notes (optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Any factors that affected your sleep (caffeine, stress, exercise, etc.)"
              className="w-full rounded-md border border-input bg-background px-3 py-2 resize-none"
            ></textarea>
          </div>

          {/* Sleep Metrics Summary */}
          <div className="bg-muted p-4 rounded-md mb-8">
            <h2 className="text-lg font-semibold mb-4">Sleep Metrics</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-card p-3 rounded-md">
                <div className="text-sm text-muted-foreground">Time in bed</div>
                <div className="text-xl font-medium">
                  {calculateTimeInBed()}
                </div>
              </div>

              <div className="bg-card p-3 rounded-md">
                <div className="text-sm text-muted-foreground">
                  Total sleep time
                </div>
                <div className="text-xl font-medium">
                  {calculateTotalSleepTime()}
                </div>
              </div>

              <div className="bg-card p-3 rounded-md">
                <div className="text-sm text-muted-foreground">
                  Sleep efficiency
                </div>
                <div className="text-xl font-medium">
                  {calculateSleepEfficiency()}%
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors disabled:opacity-70"
            >
              {isSubmitting ? "Saving..." : "Save Entry"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
