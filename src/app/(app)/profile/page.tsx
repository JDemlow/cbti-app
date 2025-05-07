// src/app/(app)/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  UserIcon,
  // BellIcon,
  ShieldCheckIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

// Predefined lists for sleep issues and goals
const sleepIssues = [
  "Difficulty falling asleep",
  "Waking up during the night",
  "Waking up too early",
  "Not feeling rested after sleep",
  "Racing thoughts at bedtime",
  "Sleep anxiety",
  "Irregular sleep schedule",
  "Excessive daytime sleepiness",
];

const sleepGoals = [
  "Fall asleep faster",
  "Stay asleep through the night",
  "Improve sleep quality",
  "Reduce sleep medication",
  "Establish a regular sleep schedule",
  "Reduce sleep anxiety",
  "Wake up feeling refreshed",
  "Learn healthy sleep habits",
];

export default function ProfilePage() {
  const { user, updateUserData, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    timeZone: "America/New_York",
    bedtime: "",
    wakeTime: "",
    insomniaDuration: "",
    sleepIssues: [] as string[],
    sleepGoals: [] as string[],
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Populate form data when user is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: typeof user.firstName === "string" ? user.firstName : "",
        lastName: typeof user.lastName === "string" ? user.lastName : "",
        email: typeof user.email === "string" ? user.email : "",
        phoneNumber:
          typeof user.phoneNumber === "string" ? user.phoneNumber : "",
        timeZone:
          typeof user.timeZone === "string"
            ? user.timeZone
            : "America/New_York",
        bedtime: typeof user.bedtime === "string" ? user.bedtime : "",
        wakeTime: typeof user.wakeTime === "string" ? user.wakeTime : "",
        insomniaDuration:
          typeof user.insomniaDuration === "string"
            ? user.insomniaDuration
            : "",
        sleepIssues: Array.isArray(user.sleepIssues) ? user.sleepIssues : [],
        sleepGoals: Array.isArray(user.sleepGoals) ? user.sleepGoals : [],
      });
    }
  }, [user]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle selection for sleep issues and goals
  const toggleSelection = (
    item: string,
    type: "sleepIssues" | "sleepGoals"
  ) => {
    setFormData((prev) => {
      const currentSelections = prev[type];
      const updatedSelections = currentSelections.includes(item)
        ? currentSelections.filter((i) => i !== item)
        : [...currentSelections, item];

      return {
        ...prev,
        [type]: updatedSelections,
      };
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateUserData({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        timeZone: formData.timeZone,
        bedtime: formData.bedtime,
        wakeTime: formData.wakeTime,
        insomniaDuration: formData.insomniaDuration,
        sleepIssues: formData.sleepIssues,
        sleepGoals: formData.sleepGoals,
      });

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

      {/* Navigation Tabs */}
      <div className="flex border-b border-border mb-6">
        <button
          className={`px-4 py-2 font-medium flex items-center gap-2 ${activeTab === "personal" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("personal")}
        >
          <UserIcon className="w-5 h-5" />
          Personal Info
        </button>
        <button
          className={`px-4 py-2 font-medium flex items-center gap-2 ${activeTab === "sleepProfile" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("sleepProfile")}
        >
          <ShieldCheckIcon className="w-5 h-5" />
          Sleep Profile
        </button>
      </div>

      {/* Success message */}
      {saveSuccess && (
        <div className="bg-success/10 text-success p-4 rounded-md mb-6 flex items-center gap-2">
          <CheckIcon className="w-5 h-5" />
          <span>Your changes have been saved successfully!</span>
        </div>
      )}

      <div className="bg-card rounded-lg p-6 shadow-sm">
        {/* Personal Information Tab */}
        {activeTab === "personal" && (
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-muted-foreground mb-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-muted-foreground mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>

              {/* Email and Phone */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-muted-foreground mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  disabled
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm opacity-60"
                />
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-muted-foreground mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>

              {/* Time Zone */}
              <div>
                <label
                  htmlFor="timeZone"
                  className="block text-sm font-medium text-muted-foreground mb-1"
                >
                  Time Zone
                </label>
                <select
                  name="timeZone"
                  id="timeZone"
                  value={formData.timeZone}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="America/Anchorage">Alaska Time (AKT)</option>
                  <option value="Pacific/Honolulu">Hawaii Time (HT)</option>
                </select>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Sleep Profile Tab */}
        {activeTab === "sleepProfile" && (
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Sleep Times */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="bedtime"
                    className="block text-sm font-medium text-muted-foreground mb-1"
                  >
                    Typical Bedtime
                  </label>
                  <input
                    type="time"
                    name="bedtime"
                    id="bedtime"
                    value={formData.bedtime}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="wakeTime"
                    className="block text-sm font-medium text-muted-foreground mb-1"
                  >
                    Typical Wake Time
                  </label>
                  <input
                    type="time"
                    name="wakeTime"
                    id="wakeTime"
                    value={formData.wakeTime}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>

              {/* Insomnia Duration */}
              <div>
                <label
                  htmlFor="insomniaDuration"
                  className="block text-sm font-medium text-muted-foreground mb-1"
                >
                  How long have you been experiencing sleep problems?
                </label>
                <select
                  name="insomniaDuration"
                  id="insomniaDuration"
                  value={formData.insomniaDuration}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select duration</option>
                  <option value="less-than-month">Less than 1 month</option>
                  <option value="1-3-months">1-3 months</option>
                  <option value="3-6-months">3-6 months</option>
                  <option value="6-12-months">6-12 months</option>
                  <option value="more-than-year">More than a year</option>
                  <option value="several-years">Several years</option>
                </select>
              </div>

              {/* Sleep Issues */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Sleep Issues
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {sleepIssues.map((issue) => (
                    <div
                      key={issue}
                      className={`p-2 rounded-md border cursor-pointer ${
                        formData.sleepIssues.includes(issue)
                          ? "border-primary bg-primary/10"
                          : "border-input hover:bg-muted"
                      }`}
                      onClick={() => toggleSelection(issue, "sleepIssues")}
                    >
                      {issue}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sleep Goals */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Sleep Goals
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {sleepGoals.map((goal) => (
                    <div
                      key={goal}
                      className={`p-2 rounded-md border cursor-pointer ${
                        formData.sleepGoals.includes(goal)
                          ? "border-primary bg-primary/10"
                          : "border-input hover:bg-muted"
                      }`}
                      onClick={() => toggleSelection(goal, "sleepGoals")}
                    >
                      {goal}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
