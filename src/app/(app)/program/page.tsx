// app/(app)/program/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  BookOpenIcon,
  ChevronRightIcon,
  LockClosedIcon,
  LightBulbIcon,
  ListBulletIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

// Mock data for the user's program progress
const userProgress = {
  currentWeek: 3,
  completedActivities: [
    "week1_introduction",
    "week1_sleep_diary",
    "week1_assessment",
    "week2_sleep_hygiene",
    "week2_diary_review",
    "week2_education",
    "week3_stimulus_control",
  ],
  weekStartDate: "Apr 2, 2025",
};

// Program structure with weeks and activities
const programStructure = [
  {
    week: 1,
    title: "Understanding Your Sleep",
    description:
      "Establish a baseline understanding of your sleep patterns and learn about the basics of sleep.",
    activities: [
      {
        id: "week1_introduction",
        title: "Program Introduction",
        type: "education",
        duration: "10 min",
        completed: true,
      },
      {
        id: "week1_sleep_diary",
        title: "Start Your Sleep Diary",
        type: "activity",
        duration: "5 min daily",
        completed: true,
      },
      {
        id: "week1_assessment",
        title: "Sleep Assessment Questionnaire",
        type: "assessment",
        duration: "15 min",
        completed: true,
      },
    ],
  },
  {
    week: 2,
    title: "Sleep Hygiene Foundations",
    description:
      "Learn about sleep hygiene principles and start implementing better sleep habits.",
    activities: [
      {
        id: "week2_sleep_hygiene",
        title: "Sleep Hygiene Guidelines",
        type: "education",
        duration: "15 min",
        completed: true,
      },
      {
        id: "week2_diary_review",
        title: "First Week Diary Review",
        type: "feedback",
        duration: "10 min",
        completed: true,
      },
      {
        id: "week2_education",
        title: "Understanding Sleep Cycles",
        type: "education",
        duration: "12 min",
        completed: true,
      },
    ],
  },
  {
    week: 3,
    title: "Stimulus Control & Sleep Restriction",
    description:
      "Begin the core CBT-I techniques to retrain your brain to associate your bed with sleep.",
    activities: [
      {
        id: "week3_stimulus_control",
        title: "Stimulus Control Instructions",
        type: "education",
        duration: "20 min",
        completed: true,
      },
      {
        id: "week3_sleep_window",
        title: "Calculate Your Sleep Window",
        type: "activity",
        duration: "15 min",
        completed: false,
      },
      {
        id: "week3_bedroom_assessment",
        title: "Bedroom Environment Assessment",
        type: "assessment",
        duration: "10 min",
        completed: false,
      },
    ],
  },
  {
    week: 4,
    title: "Addressing Sleep-Related Thoughts",
    description:
      "Learn cognitive techniques to identify and challenge unhelpful thoughts about sleep.",
    activities: [
      {
        id: "week4_cognitive_distortions",
        title: "Sleep-Related Cognitive Distortions",
        type: "education",
        duration: "15 min",
        completed: false,
      },
      {
        id: "week4_thought_record",
        title: "Sleep Thought Record",
        type: "activity",
        duration: "10 min",
        completed: false,
      },
      {
        id: "week4_progress_check",
        title: "Week 4 Progress Assessment",
        type: "assessment",
        duration: "10 min",
        completed: false,
      },
    ],
  },
  {
    week: 5,
    title: "Refining Your Sleep Window",
    description:
      "Adjust your sleep restriction schedule based on your progress and data.",
    activities: [
      {
        id: "week5_window_adjustment",
        title: "Sleep Window Adjustment",
        type: "activity",
        duration: "15 min",
        completed: false,
      },
      {
        id: "week5_daytime_fatigue",
        title: "Managing Daytime Fatigue",
        type: "education",
        duration: "12 min",
        completed: false,
      },
      {
        id: "week5_relaxation",
        title: "Progressive Relaxation Technique",
        type: "activity",
        duration: "15 min",
        completed: false,
      },
    ],
  },
  // Weeks 6-12 would follow the same pattern
  // Only including through week 5 for brevity
];

// Recommendation data based on sleep issues
const recommendations = [
  {
    title: "Follow the 15-minute rule",
    description:
      "If you can't fall asleep within 15 minutes, get up and do something relaxing in dim light until you feel sleepy again.",
    type: "behavioral",
  },
  {
    title: "Consistent wake time",
    description:
      "Maintain your scheduled wake time every day, even on weekends or after a poor night's sleep.",
    type: "scheduling",
  },
  {
    title: "Question catastrophizing thoughts",
    description:
      "Challenge thoughts like 'I'll be useless tomorrow if I don't sleep well' with more balanced perspectives.",
    type: "cognitive",
  },
];

export default function ProgramPage() {
  const [selectedWeek, setSelectedWeek] = useState<number>(
    userProgress.currentWeek
  );

  // Filter activities to update completed status
  const getActivitiesWithStatus = (week: number) => {
    const weekData = programStructure.find((w) => w.week === week);

    if (!weekData) return [];

    return weekData.activities.map((activity) => ({
      ...activity,
      completed: userProgress.completedActivities.includes(activity.id),
    }));
  };

  const currentWeekData = programStructure.find((w) => w.week === selectedWeek);
  const activitiesWithStatus = currentWeekData
    ? getActivitiesWithStatus(selectedWeek)
    : [];
  const completedActivitiesCount = activitiesWithStatus.filter(
    (a) => a.completed
  ).length;
  const totalActivitiesCount = activitiesWithStatus.length;
  const progressPercentage = Math.round(
    (completedActivitiesCount / totalActivitiesCount) * 100
  );

  // Determine if a week is locked (future), current, or completed
  const getWeekStatus = (weekNumber: number) => {
    if (weekNumber < userProgress.currentWeek) return "completed";
    if (weekNumber === userProgress.currentWeek) return "current";
    return "locked";
  };

  // Get icon for activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "education":
        return <BookOpenIcon className="w-5 h-5" />;
      case "activity":
        return <ListBulletIcon className="w-5 h-5" />;
      case "assessment":
        return <ClockIcon className="w-5 h-5" />;
      case "feedback":
        return <LightBulbIcon className="w-5 h-5" />;
      default:
        return <BookOpenIcon className="w-5 h-5" />;
    }
  };

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-2">Your CBT-I Program</h1>
      <p className="text-muted-foreground mb-6">
        Follow your personalized 12-week sleep improvement journey
      </p>

      {/* Week selection section */}
      <div className="bg-card rounded-lg p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-4">Program Timeline</h2>
        <div className="flex overflow-x-auto pb-4 space-x-3">
          {programStructure.map((week) => {
            const status = getWeekStatus(week.week);

            return (
              <button
                key={week.week}
                onClick={() => setSelectedWeek(week.week)}
                disabled={status === "locked"}
                className={`flex-shrink-0 w-36 p-3 rounded-md border transition-colors ${
                  selectedWeek === week.week
                    ? "border-primary bg-primary/10"
                    : status === "locked"
                      ? "border-muted bg-muted/30 opacity-60"
                      : "border-border bg-background hover:border-primary/50"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Week {week.week}</span>
                  {status === "locked" && (
                    <LockClosedIcon className="w-4 h-4 text-muted-foreground" />
                  )}
                  {status === "completed" && (
                    <CheckIcon className="w-4 h-4 text-success" />
                  )}
                  {status === "current" && (
                    <ChevronRightIcon className="w-4 h-4 text-primary" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {week.title}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current week details */}
      {currentWeekData && (
        <div className="bg-card rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-border">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">
                    Week {currentWeekData.week}: {currentWeekData.title}
                  </h2>
                  {getWeekStatus(currentWeekData.week) === "current" && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      Current Week
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground mt-1">
                  {currentWeekData.week === userProgress.currentWeek && (
                    <span className="text-sm">
                      Started on {userProgress.weekStartDate}
                    </span>
                  )}
                </p>
              </div>

              {/* Week navigation */}
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    setSelectedWeek((prev) => Math.max(1, prev - 1))
                  }
                  disabled={selectedWeek === 1}
                  className="p-1 rounded-md hover:bg-muted disabled:opacity-50"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setSelectedWeek((prev) =>
                      Math.min(programStructure.length, prev + 1)
                    )
                  }
                  disabled={selectedWeek === programStructure.length}
                  className="p-1 rounded-md hover:bg-muted disabled:opacity-50"
                >
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            <p className="mb-4">{currentWeekData.description}</p>

            <div className="bg-muted rounded-md p-3">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Week Progress</span>
                <span className="text-sm">
                  {completedActivitiesCount}/{totalActivitiesCount} activities
                </span>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Activities list */}
          <div className="divide-y divide-border">
            {activitiesWithStatus.map((activity) => (
              <div
                key={activity.id}
                className="p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-full ${
                      activity.completed
                        ? "bg-success/10 text-success"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {getActivityIcon(activity.type)}
                  </div>

                  <div>
                    <h3
                      className={`font-medium ${activity.completed ? "text-muted-foreground" : ""}`}
                    >
                      {activity.title}
                    </h3>
                    <div className="text-xs text-muted-foreground flex gap-3 mt-1">
                      <span className="capitalize">{activity.type}</span>
                      <span>•</span>
                      <span>{activity.duration}</span>
                    </div>
                  </div>
                </div>

                {activity.completed ? (
                  <div className="flex items-center text-success">
                    <CheckIcon className="w-5 h-5 mr-1" />
                    <span className="text-sm">Completed</span>
                  </div>
                ) : (
                  <Link
                    href={`/program/activities/${activity.id}`}
                    className="px-3 py-1 bg-primary text-white text-sm rounded-md hover:bg-primary-dark transition-colors"
                  >
                    Start
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Personalized recommendations */}
      <div className="bg-card rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <LightBulbIcon className="w-5 h-5 text-primary" />
          Personalized Recommendations
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Based on your sleep diary entries and progress, here are some focused
          recommendations for this week:
        </p>

        <div className="space-y-4">
          {recommendations.map((recommendation, index) => (
            <div key={index} className="bg-muted p-4 rounded-md">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium">{recommendation.title}</h3>
                <span className="text-xs bg-background text-muted-foreground px-2 py-0.5 rounded-full">
                  {recommendation.type}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {recommendation.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/learn"
            className="text-primary hover:underline flex items-center justify-center gap-1"
          >
            <BookOpenIcon className="w-4 h-4" />
            <span>Learn more about CBT-I techniques</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
