// src/app/(auth)/onboarding/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { CheckIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

// Existing mock data can be kept
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

export default function OnboardingPage() {
  const { user, updateUserData, isLoading: isUpdating } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    selectedIssues: [] as string[],
    selectedGoals: [] as string[],
    sleepTimes: {
      typicalBedtime: "22:30",
      typicalWakeTime: "07:00",
    },
    insomniaDuration: "",
  });

  // Prefill form with existing user data if available
  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        sleepTimes: {
          typicalBedtime: user.bedtime || prevData.sleepTimes.typicalBedtime,
          typicalWakeTime: user.wakeTime || prevData.sleepTimes.typicalWakeTime,
        },
      }));
    }
  }, [user]);

  // Define a type for the form data keys we want to dynamically update
  type SelectionKey = "selectedIssues" | "selectedGoals";

  // Toggle selection with explicit type handling
  const toggleSelection = (item: string, type: "issues" | "goals") => {
    const key: SelectionKey =
      type === "issues" ? "selectedIssues" : "selectedGoals";

    setFormData((prev) => {
      const currentSelections = prev[key];
      const updatedSelections = currentSelections.includes(item)
        ? currentSelections.filter((i) => i !== item)
        : [...currentSelections, item];

      return {
        ...prev,
        [key]: updatedSelections,
      };
    });
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      sleepTimes: {
        ...prev.sleepTimes,
        [name]: value,
      },
    }));
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      insomniaDuration: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Prepare data to update user profile
      await updateUserData({
        sleepIssues: formData.selectedIssues,
        sleepGoals: formData.selectedGoals,
        bedtime: formData.sleepTimes.typicalBedtime,
        wakeTime: formData.sleepTimes.typicalWakeTime,
        insomniaDuration: formData.insomniaDuration,
      });

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Onboarding update failed", error);
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Determine if current step is complete enough to proceed
  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.selectedIssues.length > 0;
      case 2:
        return formData.selectedGoals.length > 0;
      case 3:
        return formData.insomniaDuration !== "";
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 sm:px-6 py-10">
      <div className="max-w-lg w-full space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">RealSleep</h1>
          <h2 className="mt-6 text-2xl font-bold">
            Let&apos;s personalize your experience
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Answer a few questions to help us tailor your CBT-I program
          </p>
        </div>

        {/* Step 1: Sleep Issues */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-medium">
              What sleep issues are you experiencing?
            </h3>
            <p className="text-sm text-muted-foreground">
              Select all that apply
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sleepIssues.map((issue) => (
                <button
                  key={issue}
                  type="button"
                  onClick={() => toggleSelection(issue, "issues")}
                  className={`flex items-center p-3 rounded-md border ${
                    formData.selectedIssues.includes(issue)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-input hover:border-primary hover:bg-muted"
                  }`}
                >
                  <div
                    className={`w-5 h-5 mr-2 rounded-full border flex items-center justify-center ${
                      formData.selectedIssues.includes(issue)
                        ? "border-primary"
                        : "border-input"
                    }`}
                  >
                    {formData.selectedIssues.includes(issue) && (
                      <CheckIcon className="w-3 h-3 text-primary" />
                    )}
                  </div>
                  <span>{issue}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Sleep Goals */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-medium">What are your sleep goals?</h3>
            <p className="text-sm text-muted-foreground">
              Select all that apply
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sleepGoals.map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => toggleSelection(goal, "goals")}
                  className={`flex items-center p-3 rounded-md border ${
                    formData.selectedGoals.includes(goal)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-input hover:border-primary hover:bg-muted"
                  }`}
                >
                  <div
                    className={`w-5 h-5 mr-2 rounded-full border flex items-center justify-center ${
                      formData.selectedGoals.includes(goal)
                        ? "border-primary"
                        : "border-input"
                    }`}
                  >
                    {formData.selectedGoals.includes(goal) && (
                      <CheckIcon className="w-3 h-3 text-primary" />
                    )}
                  </div>
                  <span>{goal}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Sleep Schedule & Duration */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-medium">
              Tell us about your sleep pattern
            </h3>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="typicalBedtime"
                  className="block text-sm font-medium mb-1"
                >
                  What time do you typically go to bed?
                </label>
                <input
                  id="typicalBedtime"
                  name="typicalBedtime"
                  type="time"
                  value={formData.sleepTimes.typicalBedtime}
                  onChange={handleTimeChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="typicalWakeTime"
                  className="block text-sm font-medium mb-1"
                >
                  What time do you typically wake up?
                </label>
                <input
                  id="typicalWakeTime"
                  name="typicalWakeTime"
                  type="time"
                  value={formData.sleepTimes.typicalWakeTime}
                  onChange={handleTimeChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="insomniaDuration"
                  className="block text-sm font-medium mb-1"
                >
                  How long have you been experiencing sleep problems?
                </label>
                <select
                  id="insomniaDuration"
                  name="insomniaDuration"
                  value={formData.insomniaDuration}
                  onChange={handleDurationChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="" disabled>
                    Select duration
                  </option>
                  <option value="less-than-month">Less than 1 month</option>
                  <option value="1-3-months">1-3 months</option>
                  <option value="3-6-months">3-6 months</option>
                  <option value="6-12-months">6-12 months</option>
                  <option value="more-than-year">More than a year</option>
                  <option value="several-years">Several years</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={handleBack}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              step === 1
                ? "invisible"
                : "border border-input hover:bg-muted transition-colors"
            }`}
          >
            Back
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed() || isUpdating}
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isUpdating ? "Processing..." : step === 3 ? "Complete" : "Next"}
            {!isUpdating && step < 3 && (
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
