"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

// Mock sleep issues options
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

// Mock goals options
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
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    selectedIssues: [] as string[],
    selectedGoals: [] as string[],
    sleepTimes: {
      typicalBedtime: "22:30",
      typicalWakeTime: "07:00",
    },
    insomniaDuration: "",
  });

  // Toggle selection for issues and goals
  const toggleSelection = (item: string, type: "issues" | "goals") => {
    if (type === "issues") {
      if (formData.selectedIssues.includes(item)) {
        setFormData({
          ...formData,
          selectedIssues: formData.selectedIssues.filter((i) => i !== item),
        });
      } else {
        setFormData({
          ...formData,
          selectedIssues: [...formData.selectedIssues, item],
        });
      }
    } else {
      if (formData.selectedGoals.includes(item)) {
        setFormData({
          ...formData,
          selectedGoals: formData.selectedGoals.filter((i) => i !== item),
        });
      } else {
        setFormData({
          ...formData,
          selectedGoals: [...formData.selectedGoals, item],
        });
      }
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      sleepTimes: {
        ...formData.sleepTimes,
        [name]: value,
      },
    });
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      insomniaDuration: e.target.value,
    });
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

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // Here you would normally send the data to your backend
      // For now, we'll simulate a delay and then redirect
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("/dashboard");
    } catch (err) {
      console.error("Failed to submit onboarding data:", err);
      // We could add error handling here if needed
    } finally {
      setIsLoading(false);
    }
  };

  // Determine if current step is complete enough to proceed
  const canProceed = () => {
    if (step === 1) {
      return formData.selectedIssues.length > 0;
    } else if (step === 2) {
      return formData.selectedGoals.length > 0;
    } else {
      return formData.insomniaDuration !== "";
    }
  };

  // Render progress indicator
  const renderProgress = () => {
    return (
      <div className="mb-8 flex items-center justify-center">
        {[1, 2, 3].map((stepNumber) => (
          <div
            key={stepNumber}
            className={`flex items-center ${stepNumber < 3 ? "flex-1" : ""}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                stepNumber === step
                  ? "border-primary bg-primary text-white"
                  : stepNumber < step
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-muted-foreground bg-background text-muted-foreground"
              }`}
            >
              {stepNumber < step ? (
                <CheckIcon className="w-4 h-4" />
              ) : (
                stepNumber
              )}
            </div>
            {stepNumber < 3 && (
              <div
                className={`h-1 flex-1 mx-2 ${
                  stepNumber < step ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    );
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

        {/* Progress Indicator */}
        {renderProgress()}

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
            disabled={!canProceed() || isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading ? "Processing..." : step === 3 ? "Complete" : "Next"}
            {!isLoading && step < 3 && (
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
