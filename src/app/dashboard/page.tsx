// app/dashboard/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarIcon,
  ChartBarIcon,
  ClockIcon,
  MoonIcon,
  SunIcon,
  ArrowRightIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

// Mock data - This would come from your API in a real application
const mockUser = {
  name: "Alex Johnson",
  weekInProgram: 3,
  programProgress: 22, // percentage
  sleepEfficiency: 78, // percentage
  totalSleepTime: "6h 15m",
  averageSleepQuality: 3.5, // out of 5
};

const mockSleepData = [
  {
    day: "Mon",
    date: "3/25",
    timeInBed: "8h 30m",
    sleepTime: "6h 15m",
    quality: 3,
  },
  {
    day: "Tue",
    date: "3/26",
    timeInBed: "8h 15m",
    sleepTime: "6h 00m",
    quality: 3,
  },
  {
    day: "Wed",
    date: "3/27",
    timeInBed: "8h 00m",
    sleepTime: "6h 30m",
    quality: 4,
  },
  {
    day: "Thu",
    date: "3/28",
    timeInBed: "8h 30m",
    sleepTime: "6h 45m",
    quality: 4,
  },
  {
    day: "Fri",
    date: "3/29",
    timeInBed: "9h 00m",
    sleepTime: "6h 00m",
    quality: 3,
  },
  {
    day: "Sat",
    date: "3/30",
    timeInBed: "8h 45m",
    sleepTime: "6h 30m",
    quality: 4,
  },
  {
    day: "Sun",
    date: "3/31",
    timeInBed: "8h 30m",
    sleepTime: "6h 15m",
    quality: 3,
  },
];

const mockTasks = [
  { id: 1, title: "Complete sleep diary", type: "daily", completed: false },
  {
    id: 2,
    title: "Practice relaxation exercise",
    type: "daily",
    completed: true,
  },
  { id: 3, title: "Review week 3 materials", type: "weekly", completed: false },
  { id: 4, title: "Adjust sleep schedule", type: "weekly", completed: false },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="bg-card border-b border-border">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-xl font-bold text-primary">SleepWell</div>
            <div className="text-sm text-muted-foreground">Dashboard</div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-muted transition-colors">
              <CalendarIcon className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white">
              {mockUser.name.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        {/* Welcome Section */}
        <div className="bg-card rounded-lg p-6 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">
                Welcome back, {mockUser.name}!
              </h1>
              <p className="text-muted-foreground">
                You&apos;re in Week {mockUser.weekInProgram} of your 12-week
                program.
              </p>
            </div>
            <Link
              href="/diary/new"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Log Today&#39;s Sleep <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex border-b border-border mb-6">
          <button
            className={`px-4 py-2 font-medium ${activeTab === "overview" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "sleep" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
            onClick={() => setActiveTab("sleep")}
          >
            Sleep Data
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "progress" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
            onClick={() => setActiveTab("progress")}
          >
            Program Progress
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Progress Overview */}
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                      Program Completion
                    </span>
                    <span className="text-sm font-medium">
                      {mockUser.programProgress}%
                    </span>
                  </div>
                  <div className="w-full bg-input rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: `${mockUser.programProgress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                      Sleep Efficiency
                    </span>
                    <span className="text-sm font-medium">
                      {mockUser.sleepEfficiency}%
                    </span>
                  </div>
                  <div className="w-full bg-input rounded-full h-2.5">
                    <div
                      className="bg-secondary h-2.5 rounded-full"
                      style={{ width: `${mockUser.sleepEfficiency}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Sleep Data */}
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recent Sleep Data</h2>
                <Link
                  href="/sleep/history"
                  className="text-sm text-primary hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-2 font-medium text-muted-foreground">
                        Day
                      </th>
                      <th className="text-left py-2 px-2 font-medium text-muted-foreground">
                        Time in Bed
                      </th>
                      <th className="text-left py-2 px-2 font-medium text-muted-foreground">
                        Sleep Time
                      </th>
                      <th className="text-left py-2 px-2 font-medium text-muted-foreground">
                        Quality
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockSleepData.map((day, index) => (
                      <tr key={index} className="border-b border-border">
                        <td className="py-2 px-2 font-medium">
                          {day.day}{" "}
                          <span className="text-muted-foreground">
                            {day.date}
                          </span>
                        </td>
                        <td className="py-2 px-2">
                          <div className="flex items-center gap-1">
                            <ClockIcon className="w-4 h-4 text-muted-foreground" />
                            {day.timeInBed}
                          </div>
                        </td>
                        <td className="py-2 px-2">
                          <div className="flex items-center gap-1">
                            <MoonIcon className="w-4 h-4 text-primary" />
                            {day.sleepTime}
                          </div>
                        </td>
                        <td className="py-2 px-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <SunIcon
                                key={i}
                                className={`w-4 h-4 ${i < day.quality ? "text-warning" : "text-muted-foreground/30"}`}
                              />
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Sleep Summary */}
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Sleep Summary</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">
                      Avg. Total Sleep
                    </span>
                  </div>
                  <span className="font-medium">{mockUser.totalSleepTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SunIcon className="w-5 h-5 text-warning" />
                    <span className="text-muted-foreground">
                      Avg. Sleep Quality
                    </span>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <SunIcon
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(mockUser.averageSleepQuality) ? "text-warning" : "text-muted-foreground/30"}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ChartBarIcon className="w-5 h-5 text-secondary" />
                    <span className="text-muted-foreground">
                      Sleep Efficiency
                    </span>
                  </div>
                  <span className="font-medium">
                    {mockUser.sleepEfficiency}%
                  </span>
                </div>
              </div>
            </div>

            {/* Daily Tasks */}
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Tasks</h2>
                <Link
                  href="/tasks"
                  className="text-sm text-primary hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="space-y-3">
                {mockTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-3 rounded-md hover:bg-muted"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={task.completed}
                      className="h-5 w-5 rounded-md border-input text-primary focus:ring-primary"
                    />
                    <div className="flex-1">
                      <div
                        className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}
                      >
                        {task.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {task.type === "daily" ? "Daily Task" : "Weekly Task"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Module */}
            <div className="bg-primary text-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Current Module</h2>
              <div className="mb-3">
                <div className="font-bold mb-1">
                  Week {mockUser.weekInProgram}: Sleep Restriction
                </div>
                <div className="text-sm text-white/80">
                  Optimize your sleep efficiency by limiting time in bed
                </div>
              </div>
              <Link
                href={`/program/week-${mockUser.weekInProgram}`}
                className="flex items-center justify-center gap-2 bg-white text-primary rounded-md py-2 px-4 font-medium hover:bg-white/90 transition-colors w-full mt-3"
              >
                <BookOpenIcon className="w-5 h-5" />
                Continue Learning
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
