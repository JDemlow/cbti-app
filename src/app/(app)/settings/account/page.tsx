// app/(app)/settings/account/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  KeyIcon,
  TrashIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  BellIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

export default function AccountSettingsPage() {
  const [activeTab, setActiveTab] = useState("password");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  // Form states
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [privacySettings, setPrivacySettings] = useState({
    shareDataForResearch: true,
    allowAnonymousStatistics: true,
    showProfileToOtherUsers: false,
    storeDataLocally: true,
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivacySettings({
      ...privacySettings,
      [e.target.name]: e.target.checked,
    });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New passwords don't match");
      return;
    }

    if (passwords.newPassword.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);

      // Reset form
      setPasswords({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Clear success message after delay
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1000);
  };

  const handlePrivacySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);

      // Clear success message after delay
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1000);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmText !== "delete my account") {
      alert("Please type 'delete my account' to confirm");
      return;
    }

    setIsDeleting(true);

    // Simulate API call
    setTimeout(() => {
      alert(
        "Account successfully deleted. You will be redirected to the homepage."
      );
      window.location.href = "/";
    }, 2000);
  };

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

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
          className="px-4 py-2 font-medium border-b-2 border-primary text-primary mr-2"
        >
          <span className="flex items-center gap-2">
            <KeyIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Account</span>
          </span>
        </Link>
        <Link
          href="/settings/notifications"
          className="px-4 py-2 font-medium text-muted-foreground"
        >
          <span className="flex items-center gap-2">
            <BellIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Notifications</span>
          </span>
        </Link>
      </div>

      {/* Account Settings Tabs */}
      <div className="flex mb-6">
        <button
          className={`px-4 py-2 font-medium flex items-center gap-2 ${activeTab === "password" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("password")}
        >
          <KeyIcon className="w-5 h-5" />
          Password
        </button>
        <button
          className={`px-4 py-2 font-medium flex items-center gap-2 ${activeTab === "privacy" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("privacy")}
        >
          <ShieldCheckIcon className="w-5 h-5" />
          Privacy
        </button>
        <button
          className={`px-4 py-2 font-medium flex items-center gap-2 ${activeTab === "delete" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("delete")}
        >
          <TrashIcon className="w-5 h-5" />
          Delete Account
        </button>
      </div>

      {/* Success message */}
      {saveSuccess && (
        <div className="bg-success/10 text-success p-4 rounded-md mb-6 flex items-center gap-2">
          <CheckIcon className="w-5 h-5" />
          <span>Your changes have been saved successfully!</span>
        </div>
      )}

      {/* Tab Content */}
      <div className="bg-card rounded-lg p-6 shadow-sm">
        {/* Password Change Tab */}
        {activeTab === "password" && (
          <form onSubmit={handlePasswordSubmit}>
            <div className="space-y-6">
              <div className="max-w-md">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-1">
                    Change Password
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Update your password to maintain the security of your
                    account.
                  </p>
                </div>

                {/* Old Password */}
                <div className="mb-4">
                  <label
                    htmlFor="oldPassword"
                    className="block text-sm font-medium text-muted-foreground mb-1"
                  >
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showOldPassword ? "text" : "password"}
                      name="oldPassword"
                      id="oldPassword"
                      value={passwords.oldPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm pr-10"
                      placeholder="Enter your current password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center px-3"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      tabIndex={-1}
                    >
                      {showOldPassword ? (
                        <EyeSlashIcon className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <EyeIcon className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div className="mb-4">
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-muted-foreground mb-1"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      id="newPassword"
                      value={passwords.newPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm pr-10"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center px-3"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      tabIndex={-1}
                    >
                      {showNewPassword ? (
                        <EyeSlashIcon className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <EyeIcon className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Password must be at least 8 characters long
                  </p>
                </div>

                {/* Confirm Password */}
                <div className="mb-6">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-muted-foreground mb-1"
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      value={passwords.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm pr-10"
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center px-3"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <EyeIcon className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center gap-2"
                    disabled={isSaving}
                  >
                    {isSaving ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* Privacy Settings Tab */}
        {activeTab === "privacy" && (
          <form onSubmit={handlePrivacySubmit}>
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-1">Privacy Settings</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Control how your data is used and shared within the RealSleep
                  application.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">
                        Share anonymous data for research
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Help improve sleep science by sharing anonymized sleep
                        data
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="shareDataForResearch"
                        checked={privacySettings.shareDataForResearch}
                        onChange={handlePrivacyChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-input rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">
                        Allow anonymous usage statistics
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Help us improve the app by sharing anonymous usage data
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="allowAnonymousStatistics"
                        checked={privacySettings.allowAnonymousStatistics}
                        onChange={handlePrivacyChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-input rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">
                        Show profile to other users
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Allow your profile to be visible to other RealSleep
                        users
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="showProfileToOtherUsers"
                        checked={privacySettings.showProfileToOtherUsers}
                        onChange={handlePrivacyChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-input rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Store data locally</div>
                      <div className="text-sm text-muted-foreground">
                        Keep a copy of your sleep data on your device for
                        offline access
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="storeDataLocally"
                        checked={privacySettings.storeDataLocally}
                        onChange={handlePrivacyChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-input rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center gap-2"
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save Privacy Settings"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* Delete Account Tab */}
        {activeTab === "delete" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-1 text-error">
                Delete Account
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Once you delete your account, all of your data will be
                permanently removed. This action cannot be undone.
              </p>

              <div className="bg-error/10 border border-error/20 rounded-md p-4 mb-6">
                <div className="flex gap-3">
                  <ExclamationTriangleIcon className="w-5 h-5 text-error shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-error mb-1">
                      Warning: This action is permanent
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      When you delete your account, all of your personal
                      information, sleep data, progress, and settings will be
                      permanently removed from our servers. You will lose access
                      to your account and all associated data.
                    </p>
                  </div>
                </div>
              </div>

              {!showDeleteConfirm ? (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 bg-error text-white rounded-md hover:bg-error/90 transition-colors flex items-center gap-2"
                >
                  <TrashIcon className="w-5 h-5" />
                  Delete Account
                </button>
              ) : (
                <div className="border border-border rounded-md p-4">
                  <p className="text-sm font-medium mb-4">
                    To confirm deletion, please type &quot;delete my
                    account&quot; below:
                  </p>
                  <input
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm mb-4"
                    placeholder="delete my account"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleDeleteAccount}
                      className="px-4 py-2 bg-error text-white rounded-md hover:bg-error/90 transition-colors flex items-center gap-2"
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Confirm Deletion"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowDeleteConfirm(false);
                        setDeleteConfirmText("");
                      }}
                      className="px-4 py-2 bg-muted text-foreground rounded-md hover:bg-muted/80 transition-colors"
                      disabled={isDeleting}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
