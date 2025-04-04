// app/(app)/settings/notifications/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  UserCircleIcon,
  BellIcon,
  KeyIcon,
  CheckIcon,
  ClockIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  MoonIcon,
  ChartBarIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

// Mock user notification settings - would come from database in real app
const mockNotificationSettings = {
  emailNotifications: {
    sleepReminderEmails: true,
    weeklyProgressEmails: true,
    tipsAndArticles: false,
    accountAlerts: true,
  },
  inAppNotifications: {
    sleepReminders: true,
    journalReminders: true,
    progressUpdates: true,
    achievementAlerts: true,
    newFeaturesAndTips: false,
  },
  reminderFrequency: {
    sleepReminders: "daily",
    journalReminders: "daily",
    progressReports: "weekly",
  },
  reminderTimes: {
    sleepReminderTime: "21:00",
    morningReminderTime: "08:00",
    progressReportDay: "monday",
  },
};

type ReminderFrequency = "never" | "daily" | "weekdays" | "weekends" | "weekly";

export default function NotificationsSettingsPage() {
  const [notificationSettings, setNotificationSettings] = useState(
    mockNotificationSettings
  );
  const [activeTab, setActiveTab] = useState("email");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleEmailToggle = (
    setting: keyof typeof mockNotificationSettings.emailNotifications
  ) => {
    setNotificationSettings({
      ...notificationSettings,
      emailNotifications: {
        ...notificationSettings.emailNotifications,
        [setting]: !notificationSettings.emailNotifications[setting],
      },
    });
  };

  const handleInAppToggle = (
    setting: keyof typeof mockNotificationSettings.inAppNotifications
  ) => {
    setNotificationSettings({
      ...notificationSettings,
      inAppNotifications: {
        ...notificationSettings.inAppNotifications,
        [setting]: !notificationSettings.inAppNotifications[setting],
      },
    });
  };

  const handleFrequencyChange = (
    setting: keyof typeof mockNotificationSettings.reminderFrequency,
    value: ReminderFrequency
  ) => {
    setNotificationSettings({
      ...notificationSettings,
      reminderFrequency: {
        ...notificationSettings.reminderFrequency,
        [setting]: value,
      },
    });
  };

  const handleTimeChange = (
    setting: keyof typeof mockNotificationSettings.reminderTimes,
    value: string
  ) => {
    setNotificationSettings({
      ...notificationSettings,
      reminderTimes: {
        ...notificationSettings.reminderTimes,
        [setting]: value,
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
      <h1 className="text-2xl font-bold mb-6">Notification Settings</h1>

      {/* Settings Navigation */}
      <div className="flex border-b border-border mb-6 overflow-x-auto pb-1">
        <Link
          href="/settings"
          className="px-4 py-2 font-medium text-muted-foreground mr-2"
        >
          <span className="flex items-center gap-2">
            <UserCircleIcon className="w-5 h-5" />
            <span className="hidden sm:inline">General</span>
          </span>
        </Link>
        <Link
          href="/settings/account"
          className="px-4 py-2 font-medium text-muted-foreground mr-2"
        >
          <span className="flex items-center gap-2">
            <KeyIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Account</span>
          </span>
        </Link>
        <Link
          href="/settings/notifications"
          className="px-4 py-2 font-medium border-b-2 border-primary text-primary"
        >
          <span className="flex items-center gap-2">
            <BellIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Notifications</span>
          </span>
        </Link>
      </div>

      {/* Notification Settings Tabs */}
      <div className="flex mb-6 border-b border-border">
        <button
          className={`px-4 py-2 font-medium flex items-center gap-2 ${activeTab === "email" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("email")}
        >
          <EnvelopeIcon className="w-5 h-5" />
          Email
        </button>
        <button
          className={`px-4 py-2 font-medium flex items-center gap-2 ${activeTab === "inapp" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("inapp")}
        >
          <DevicePhoneMobileIcon className="w-5 h-5" />
          In-App
        </button>
        <button
          className={`px-4 py-2 font-medium flex items-center gap-2 ${activeTab === "frequency" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("frequency")}
        >
          <ClockIcon className="w-5 h-5" />
          Timing
        </button>
      </div>

      {/* Success message */}
      {saveSuccess && (
        <div className="bg-success/10 text-success p-4 rounded-md mb-6 flex items-center gap-2">
          <CheckIcon className="w-5 h-5" />
          <span>
            Your notification preferences have been saved successfully!
          </span>
        </div>
      )}

      {/* Tab Content */}
      <div className="bg-card rounded-lg p-6 shadow-sm">
        <form onSubmit={handleSubmit}>
          {/* Email Notifications Tab */}
          {activeTab === "email" && (
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-1">
                  Email Notifications
                </h2>
                <p className="text-sm text-muted-foreground">
                  Choose which email notifications you&apos;d like to receive
                  from RealSleep.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Bedtime Reminders</div>
                    <div className="text-sm text-muted-foreground">
                      Receive email reminders when it&apos;s time to prepare for
                      sleep
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        notificationSettings.emailNotifications
                          .sleepReminderEmails
                      }
                      onChange={() => handleEmailToggle("sleepReminderEmails")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-input rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Weekly Progress Reports</div>
                    <div className="text-sm text-muted-foreground">
                      Receive weekly summaries of your sleep progress via email
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        notificationSettings.emailNotifications
                          .weeklyProgressEmails
                      }
                      onChange={() => handleEmailToggle("weeklyProgressEmails")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-input rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Tips & Articles</div>
                    <div className="text-sm text-muted-foreground">
                      Receive sleep tips and educational content via email
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        notificationSettings.emailNotifications.tipsAndArticles
                      }
                      onChange={() => handleEmailToggle("tipsAndArticles")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-input rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Account Alerts</div>
                    <div className="text-sm text-muted-foreground">
                      Receive security and account-related notifications
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        notificationSettings.emailNotifications.accountAlerts
                      }
                      onChange={() => handleEmailToggle("accountAlerts")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-input rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-md">
                <div className="flex gap-2 text-sm text-muted-foreground">
                  <InformationCircleIcon className="w-5 h-5 shrink-0" />
                  <p>
                    You can unsubscribe from marketing emails at any time by
                    clicking the unsubscribe link in the footer of any email. We
                    will still send account-related emails for important
                    notifications.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* In-App Notifications Tab */}
          {activeTab === "inapp" && (
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-1">
                  In-App Notifications
                </h2>
                <p className="text-sm text-muted-foreground">
                  Choose which notifications you&apos;d like to receive within
                  the RealSleep app.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Sleep Reminders</div>
                    <div className="text-sm text-muted-foreground">
                      Notify when it&apos;s time to prepare for sleep
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        notificationSettings.inAppNotifications.sleepReminders
                      }
                      onChange={() => handleInAppToggle("sleepReminders")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-input rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Journal Reminders</div>
                    <div className="text-sm text-muted-foreground">
                      Remind to complete your sleep diary entry
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        notificationSettings.inAppNotifications.journalReminders
                      }
                      onChange={() => handleInAppToggle("journalReminders")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-input rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Progress Updates</div>
                    <div className="text-sm text-muted-foreground">
                      Notify about sleep quality improvements and trends
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        notificationSettings.inAppNotifications.progressUpdates
                      }
                      onChange={() => handleInAppToggle("progressUpdates")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-input rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Achievement Alerts</div>
                    <div className="text-sm text-muted-foreground">
                      Celebrate milestones and achievements in your sleep
                      journey
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        notificationSettings.inAppNotifications
                          .achievementAlerts
                      }
                      onChange={() => handleInAppToggle("achievementAlerts")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-input rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">New Features & Tips</div>
                    <div className="text-sm text-muted-foreground">
                      Get updates about new app features and sleep tips
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        notificationSettings.inAppNotifications
                          .newFeaturesAndTips
                      }
                      onChange={() => handleInAppToggle("newFeaturesAndTips")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-input rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Frequency & Timing Tab */}
          {activeTab === "frequency" && (
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-1">
                  Reminder Frequency & Timing
                </h2>
                <p className="text-sm text-muted-foreground">
                  Set when and how often you&apos;d like to receive reminders.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium mb-4 flex items-center gap-2">
                    <MoonIcon className="w-5 h-5 text-primary" />
                    Sleep Reminders
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Frequency
                      </label>
                      <select
                        value={
                          notificationSettings.reminderFrequency.sleepReminders
                        }
                        onChange={(e) =>
                          handleFrequencyChange(
                            "sleepReminders",
                            e.target.value as ReminderFrequency
                          )
                        }
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="never">Never</option>
                        <option value="daily">Every day</option>
                        <option value="weekdays">Weekdays only</option>
                        <option value="weekends">Weekends only</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="sleepReminderTime"
                        className="block text-sm font-medium text-muted-foreground mb-2"
                      >
                        Bedtime Reminder (Time)
                      </label>
                      <input
                        type="time"
                        id="sleepReminderTime"
                        value={
                          notificationSettings.reminderTimes.sleepReminderTime
                        }
                        onChange={(e) =>
                          handleTimeChange("sleepReminderTime", e.target.value)
                        }
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="text-md font-medium mb-4 flex items-center gap-2">
                    <ClockIcon className="w-5 h-5 text-primary" />
                    Journal Reminders
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Frequency
                      </label>
                      <select
                        value={
                          notificationSettings.reminderFrequency
                            .journalReminders
                        }
                        onChange={(e) =>
                          handleFrequencyChange(
                            "journalReminders",
                            e.target.value as ReminderFrequency
                          )
                        }
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="never">Never</option>
                        <option value="daily">Every day</option>
                        <option value="weekdays">Weekdays only</option>
                        <option value="weekends">Weekends only</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="morningReminderTime"
                        className="block text-sm font-medium text-muted-foreground mb-2"
                      >
                        Morning Reminder (Time)
                      </label>
                      <input
                        type="time"
                        id="morningReminderTime"
                        value={
                          notificationSettings.reminderTimes.morningReminderTime
                        }
                        onChange={(e) =>
                          handleTimeChange(
                            "morningReminderTime",
                            e.target.value
                          )
                        }
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="text-md font-medium mb-4 flex items-center gap-2">
                    <ChartBarIcon className="w-5 h-5 text-primary" />
                    Progress Reports
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Frequency
                      </label>
                      <select
                        value={
                          notificationSettings.reminderFrequency.progressReports
                        }
                        onChange={(e) =>
                          handleFrequencyChange(
                            "progressReports",
                            e.target.value as ReminderFrequency
                          )
                        }
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="never">Never</option>
                        <option value="weekly">Weekly</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="progressReportDay"
                        className="block text-sm font-medium text-muted-foreground mb-2"
                      >
                        Weekly Report Day
                      </label>
                      <select
                        id="progressReportDay"
                        value={
                          notificationSettings.reminderTimes.progressReportDay
                        }
                        onChange={(e) =>
                          handleTimeChange("progressReportDay", e.target.value)
                        }
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="monday">Monday</option>
                        <option value="tuesday">Tuesday</option>
                        <option value="wednesday">Wednesday</option>
                        <option value="thursday">Thursday</option>
                        <option value="friday">Friday</option>
                        <option value="saturday">Saturday</option>
                        <option value="sunday">Sunday</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center gap-2"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Notification Settings"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
