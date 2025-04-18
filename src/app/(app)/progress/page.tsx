// app/(app)/progress/page.tsx
"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  // CalendarIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";

// Mock data - In a real application, this would come from your API
const sleepData = [
  {
    date: "Mar 25",
    sleepTime: 6.25,
    sleepEfficiency: 73,
    sleepQuality: 3,
    timeInBed: 8.5,
    timeToFallAsleep: 30,
  },
  {
    date: "Mar 26",
    sleepTime: 6.0,
    sleepEfficiency: 71,
    sleepQuality: 3,
    timeInBed: 8.25,
    timeToFallAsleep: 35,
  },
  {
    date: "Mar 27",
    sleepTime: 6.5,
    sleepEfficiency: 76,
    sleepQuality: 4,
    timeInBed: 8.0,
    timeToFallAsleep: 25,
  },
  {
    date: "Mar 28",
    sleepTime: 6.75,
    sleepEfficiency: 85,
    sleepQuality: 4,
    timeInBed: 7.75,
    timeToFallAsleep: 20,
  },
  {
    date: "Mar 29",
    sleepTime: 6.0,
    sleepEfficiency: 70,
    sleepQuality: 3,
    timeInBed: 9.0,
    timeToFallAsleep: 40,
  },
  {
    date: "Mar 30",
    sleepTime: 6.5,
    sleepEfficiency: 81,
    sleepQuality: 4,
    timeInBed: 8.25,
    timeToFallAsleep: 22,
  },
  {
    date: "Mar 31",
    sleepTime: 6.25,
    sleepEfficiency: 75,
    sleepQuality: 3,
    timeInBed: 8.5,
    timeToFallAsleep: 28,
  },
  {
    date: "Apr 01",
    sleepTime: 6.8,
    sleepEfficiency: 83,
    sleepQuality: 4,
    timeInBed: 8.0,
    timeToFallAsleep: 19,
  },
  {
    date: "Apr 02",
    sleepTime: 7.0,
    sleepEfficiency: 87,
    sleepQuality: 4,
    timeInBed: 8.0,
    timeToFallAsleep: 17,
  },
  {
    date: "Apr 03",
    sleepTime: 7.2,
    sleepEfficiency: 90,
    sleepQuality: 5,
    timeInBed: 8.0,
    timeToFallAsleep: 15,
  },
  {
    date: "Apr 04",
    sleepTime: 7.0,
    sleepEfficiency: 88,
    sleepQuality: 4,
    timeInBed: 8.0,
    timeToFallAsleep: 16,
  },
  {
    date: "Apr 05",
    sleepTime: 7.25,
    sleepEfficiency: 91,
    sleepQuality: 5,
    timeInBed: 8.0,
    timeToFallAsleep: 14,
  },
  {
    date: "Apr 06",
    sleepTime: 7.0,
    sleepEfficiency: 89,
    sleepQuality: 4,
    timeInBed: 7.75,
    timeToFallAsleep: 15,
  },
  {
    date: "Apr 07",
    sleepTime: 7.3,
    sleepEfficiency: 92,
    sleepQuality: 5,
    timeInBed: 7.75,
    timeToFallAsleep: 13,
  },
];

// Mock achieved milestones
const milestones = [
  {
    title: "Sleep Efficiency > 85%",
    date: "Apr 2",
    description: "Achieved consistent sleep efficiency above 85%",
    achieved: true,
  },
  {
    title: "7+ Hours of Sleep",
    date: "Apr 3",
    description: "Consistently sleeping more than 7 hours per night",
    achieved: true,
  },
  {
    title: "Fall Asleep in <20 min",
    date: "Apr 2",
    description: "Regularly falling asleep in less than 20 minutes",
    achieved: true,
  },
  {
    title: "Consistent Wake Time",
    date: "Mar 30",
    description: "Maintained a consistent wake time for one week",
    achieved: true,
  },
  {
    title: "No Daytime Napping",
    date: "Not achieved",
    description: "One full week without daytime naps",
    achieved: false,
  },
  {
    title: "Sleep Quality 4+",
    date: "Apr 3",
    description: "Sleep quality rating of 4 or higher for one week",
    achieved: true,
  },
];

// Calculate the percentage improvement for key metrics
const calculateImprovement = (data: typeof sleepData) => {
  if (data.length < 2) return null;

  const firstWeekData = data.slice(0, 7);
  const lastWeekData = data.slice(-7);

  const firstWeekSleepTime =
    firstWeekData.reduce((sum, entry) => sum + entry.sleepTime, 0) /
    firstWeekData.length;
  const lastWeekSleepTime =
    lastWeekData.reduce((sum, entry) => sum + entry.sleepTime, 0) /
    lastWeekData.length;

  const firstWeekEfficiency =
    firstWeekData.reduce((sum, entry) => sum + entry.sleepEfficiency, 0) /
    firstWeekData.length;
  const lastWeekEfficiency =
    lastWeekData.reduce((sum, entry) => sum + entry.sleepEfficiency, 0) /
    lastWeekData.length;

  const firstWeekFallAsleepTime =
    firstWeekData.reduce((sum, entry) => sum + entry.timeToFallAsleep, 0) /
    firstWeekData.length;
  const lastWeekFallAsleepTime =
    lastWeekData.reduce((sum, entry) => sum + entry.timeToFallAsleep, 0) /
    lastWeekData.length;

  return {
    sleepTime: {
      change: (
        ((lastWeekSleepTime - firstWeekSleepTime) / firstWeekSleepTime) *
        100
      ).toFixed(1),
      before: firstWeekSleepTime.toFixed(1),
      after: lastWeekSleepTime.toFixed(1),
    },
    efficiency: {
      change: (
        ((lastWeekEfficiency - firstWeekEfficiency) / firstWeekEfficiency) *
        100
      ).toFixed(1),
      before: firstWeekEfficiency.toFixed(1),
      after: lastWeekEfficiency.toFixed(1),
    },
    fallAsleepTime: {
      change: (
        ((firstWeekFallAsleepTime - lastWeekFallAsleepTime) /
          firstWeekFallAsleepTime) *
        100
      ).toFixed(1),
      before: Math.round(firstWeekFallAsleepTime),
      after: Math.round(lastWeekFallAsleepTime),
    },
  };
};

export default function ProgressPage() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "all">("all");
  const [focusMetric, setFocusMetric] = useState<
    "efficiency" | "sleepTime" | "quality" | "timeToFallAsleep"
  >("efficiency");

  // Filter data based on time range
  const getFilteredData = () => {
    switch (timeRange) {
      case "week":
        return sleepData.slice(-7);
      case "month":
        return sleepData.slice(-30);
      default:
        return sleepData;
    }
  };

  const filteredData = getFilteredData();
  const improvements = calculateImprovement(sleepData);

  // Get color based on improvement value
  const getImprovementColor = (value: number, isNegativeBetter = false) => {
    if (isNegativeBetter) {
      return value < 0 ? "text-success" : "text-error";
    }
    return value > 0 ? "text-success" : "text-error";
  };

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Your Sleep Progress</h1>

      {/* Time Range Filter */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTimeRange("week")}
          className={`px-3 py-1 rounded-md ${timeRange === "week" ? "bg-primary text-white" : "bg-muted"}`}
        >
          Last Week
        </button>
        <button
          onClick={() => setTimeRange("month")}
          className={`px-3 py-1 rounded-md ${timeRange === "month" ? "bg-primary text-white" : "bg-muted"}`}
        >
          Last Month
        </button>
        <button
          onClick={() => setTimeRange("all")}
          className={`px-3 py-1 rounded-md ${timeRange === "all" ? "bg-primary text-white" : "bg-muted"}`}
        >
          All Time
        </button>
      </div>

      {/* Improvements Overview Cards */}
      {improvements && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-card rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-primary" />
                <h3 className="font-medium">Sleep Duration</h3>
              </div>
              <span
                className={`text-sm font-bold ${getImprovementColor(parseFloat(improvements.sleepTime.change))}`}
              >
                {improvements.sleepTime.change}%
              </span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Before: {improvements.sleepTime.before}h</span>
              <span>After: {improvements.sleepTime.after}h</span>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <ChartBarIcon className="w-5 h-5 text-primary" />
                <h3 className="font-medium">Sleep Efficiency</h3>
              </div>
              <span
                className={`text-sm font-bold ${getImprovementColor(parseFloat(improvements.efficiency.change))}`}
              >
                {improvements.efficiency.change}%
              </span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Before: {improvements.efficiency.before}%</span>
              <span>After: {improvements.efficiency.after}%</span>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <ArrowTrendingUpIcon className="w-5 h-5 text-primary" />
                <h3 className="font-medium">Time to Fall Asleep</h3>
              </div>
              <span
                className={`text-sm font-bold ${getImprovementColor(parseFloat(improvements.fallAsleepTime.change), true)}`}
              >
                {improvements.fallAsleepTime.change}%
              </span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Before: {improvements.fallAsleepTime.before} min</span>
              <span>After: {improvements.fallAsleepTime.after} min</span>
            </div>
          </div>
        </div>
      )}

      {/* Metric Selection */}
      <div className="bg-card rounded-lg p-4 shadow-sm mb-6">
        <h2 className="text-lg font-medium mb-3">Sleep Metrics</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setFocusMetric("efficiency")}
            className={`px-3 py-1 rounded-md text-sm ${focusMetric === "efficiency" ? "bg-primary text-white" : "bg-muted"}`}
          >
            Sleep Efficiency
          </button>
          <button
            onClick={() => setFocusMetric("sleepTime")}
            className={`px-3 py-1 rounded-md text-sm ${focusMetric === "sleepTime" ? "bg-primary text-white" : "bg-muted"}`}
          >
            Sleep Duration
          </button>
          <button
            onClick={() => setFocusMetric("quality")}
            className={`px-3 py-1 rounded-md text-sm ${focusMetric === "quality" ? "bg-primary text-white" : "bg-muted"}`}
          >
            Sleep Quality
          </button>
          <button
            onClick={() => setFocusMetric("timeToFallAsleep")}
            className={`px-3 py-1 rounded-md text-sm ${focusMetric === "timeToFallAsleep" ? "bg-primary text-white" : "bg-muted"}`}
          >
            Time to Fall Asleep
          </button>
        </div>

        {/* Main Chart */}
        <div className="w-full h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={filteredData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {focusMetric === "efficiency" && (
                <Line
                  type="monotone"
                  dataKey="sleepEfficiency"
                  name="Sleep Efficiency (%)"
                  stroke="#3b82f6"
                  activeDot={{ r: 8 }}
                />
              )}
              {focusMetric === "sleepTime" && (
                <Line
                  type="monotone"
                  dataKey="sleepTime"
                  name="Sleep Duration (hours)"
                  stroke="#10b981"
                  activeDot={{ r: 8 }}
                />
              )}
              {focusMetric === "quality" && (
                <Line
                  type="monotone"
                  dataKey="sleepQuality"
                  name="Sleep Quality (1-5)"
                  stroke="#8b5cf6"
                  activeDot={{ r: 8 }}
                />
              )}
              {focusMetric === "timeToFallAsleep" && (
                <Line
                  type="monotone"
                  dataKey="timeToFallAsleep"
                  name="Time to Fall Asleep (min)"
                  stroke="#f59e0b"
                  activeDot={{ r: 8 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sleep Efficiency vs. Time in Bed */}
      <div className="bg-card rounded-lg p-4 shadow-sm mb-6">
        <h2 className="text-lg font-medium mb-3">
          Sleep Efficiency vs. Time in Bed
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          This chart shows how your sleep efficiency relates to your total time
          in bed. Optimal sleep efficiency is achieved when your time in bed
          closely matches your actual sleep time.
        </p>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="timeInBed"
                name="Time in Bed (hours)"
                fill="#9ca3af"
              />
              <Bar
                dataKey="sleepTime"
                name="Sleep Time (hours)"
                fill="#3b82f6"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Milestones and Achievements */}
      <div className="bg-card rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <TrophyIcon className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-medium">Milestones & Achievements</h2>
        </div>

        <div className="space-y-3">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className={`p-3 rounded-md border ${milestone.achieved ? "border-success bg-success/10" : "border-muted bg-muted/50"}`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{milestone.title}</h3>
                <span className="text-xs bg-card px-2 py-1 rounded-full">
                  {milestone.achieved ? milestone.date : "Not achieved"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {milestone.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
