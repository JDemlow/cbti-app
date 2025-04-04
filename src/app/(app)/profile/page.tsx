// app/(app)/profile/page.tsx
"use client";

import { useState } from "react";
import {
  UserIcon,
  BellIcon,
  ShieldCheckIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

// Mock user data - would come from your database in a real app
const mockUser = {
  firstName: "Alex",
  lastName: "Johnson",
  email: "alex.johnson@example.com",
  phoneNumber: "(555) 123-4567",
  timeZone: "America/New_York",
  weekInProgram: 3,
  notificationPreferences: {
    emailReminders: true,
    sleepTimeReminders: true,
    weeklyReports: true,
    programUpdates: false,
  },
  sleepGoals: {
    bedtime: "22:30",
    wakeTime: "06:30",
    sleepDuration: 8,
  },
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [user, setUser] = useState(mockUser);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      notificationPreferences: {
        ...user.notificationPreferences,
        [e.target.name]: e.target.checked,
      },
    });
  };

  const handleSleepGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      sleepGoals: {
        ...user.sleepGoals,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

      {/* Profile Navigation */}
      <div className="flex border-b border-border mb-6">
        <button
          className={`px-4 py-2 font-medium flex items-center gap-2 ${activeTab === "personal" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("personal")}
        >
          <UserIcon className="w-5 h-5" />
          Personal Info
        </button>
        <button
          className={`px-4 py-2 font-medium flex items-center gap-2 ${activeTab === "notifications" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("notifications")}
        >
          <BellIcon className="w-5 h-5" />
          Notifications
        </button>
        <button
          className={`px-4 py-2 font-medium flex items-center gap-2 ${activeTab === "sleepGoals" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("sleepGoals")}
        >
          <ShieldCheckIcon className="w-5 h-5" />
          Sleep Goals
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
                    value={user.firstName}
                    onChange={handlePersonalInfoChange}
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
                    value={user.lastName}
                    onChange={handlePersonalInfoChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>

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
                  value={user.email}
                  onChange={handlePersonalInfoChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
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
                  value={user.phoneNumber}
                  onChange={handlePersonalInfoChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>

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
                  value={user.timeZone}
                  onChange={(e) =>
                    setUser({ ...user, timeZone: e.target.value })
                  }
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
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="text-sm text-muted-foreground mb-4">
                Choose which notifications you&apos;d like to receive from
                RealSleep
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Email Reminders</div>
                    <div className="text-sm text-muted-foreground">
                      Receive email notifications about your sleep diary
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="emailReminders"
                      checked={user.notificationPreferences.emailReminders}
                      onChange={handleNotificationChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-input rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Sleep Time Reminders</div>
                    <div className="text-sm text-muted-foreground">
                      Get reminded when it&apos;s time to prepare for sleep
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="sleepTimeReminders"
                      checked={user.notificationPreferences.sleepTimeReminders}
                      onChange={handleNotificationChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-input rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Weekly Reports</div>
                    <div className="text-sm text-muted-foreground">
                      Receive weekly summaries of your sleep progress
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="weeklyReports"
                      checked={user.notificationPreferences.weeklyReports}
                      onChange={handleNotificationChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-input rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Program Updates</div>
                    <div className="text-sm text-muted-foreground">
                      Get notified about new features and CBT-I content
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="programUpdates"
                      checked={user.notificationPreferences.programUpdates}
                      onChange={handleNotificationChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-input rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center gap-2"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Sleep Goals Tab */}
        {activeTab === "sleepGoals" && (
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="text-sm text-muted-foreground mb-4">
                Set your sleep goals to help establish a healthy sleep schedule
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="bedtime"
                    className="block text-sm font-medium text-muted-foreground mb-1"
                  >
                    Target Bedtime
                  </label>
                  <input
                    type="time"
                    name="bedtime"
                    id="bedtime"
                    value={user.sleepGoals.bedtime}
                    onChange={handleSleepGoalChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="wakeTime"
                    className="block text-sm font-medium text-muted-foreground mb-1"
                  >
                    Target Wake Time
                  </label>
                  <input
                    type="time"
                    name="wakeTime"
                    id="wakeTime"
                    value={user.sleepGoals.wakeTime}
                    onChange={handleSleepGoalChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="sleepDuration"
                  className="block text-sm font-medium text-muted-foreground mb-1"
                >
                  Target Sleep Duration (hours)
                </label>
                <input
                  type="number"
                  name="sleepDuration"
                  id="sleepDuration"
                  min="4"
                  max="12"
                  step="0.5"
                  value={user.sleepGoals.sleepDuration}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      sleepGoals: {
                        ...user.sleepGoals,
                        sleepDuration: parseFloat(e.target.value),
                      },
                    })
                  }
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center gap-2"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
