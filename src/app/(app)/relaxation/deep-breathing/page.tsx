"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ClockIcon,
  PlayIcon,
  // PauseIcon,
  ArrowPathIcon,
  BookmarkIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

export default function DeepBreathingPage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isStarted, setIsStarted] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // In a real implementation, this would persist to user data
  };

  const toggleStepCompletion = (stepIndex: number) => {
    if (completedSteps.includes(stepIndex)) {
      setCompletedSteps(completedSteps.filter((step) => step !== stepIndex));
    } else {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  const resetProgress = () => {
    setCompletedSteps([]);
    setIsStarted(false);
  };

  // Define the steps for deep breathing technique
  const steps = [
    "Find a comfortable sitting or lying position in a quiet space.",
    "Place one hand on your chest and the other on your abdomen, just below your ribcage.",
    "Take a slow, deep breath in through your nose, feeling your abdomen rise. Your chest should move only slightly.",
    "Hold your breath for a moment (1-2 seconds).",
    "Exhale slowly through your mouth, feeling your abdomen fall.",
    "Focus on the sensation of your breath and how your body relaxes with each exhale.",
    "Continue breathing deeply for 5-10 minutes, maintaining a slow rhythm.",
  ];

  // Benefits of this technique
  const benefits = [
    "Reduces physical tension and promotes relaxation",
    "Decreases stress and anxiety levels",
    "Lowers heart rate and blood pressure",
    "Helps quiet racing thoughts",
    "Can be practiced anywhere, even in bed",
  ];

  // Tips for better practice
  const tips = [
    "Try to breathe at a rate of about 6-8 breaths per minute",
    "If your mind wanders, gently bring your focus back to your breathing",
    "Practice regularly, not just when you're having trouble sleeping",
    "Try to make your exhale slightly longer than your inhale for enhanced relaxation",
  ];

  return (
    <div className="container py-6">
      {/* Header with navigation */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <Link
            href="/relaxation"
            className="text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Back to techniques</span>
          </Link>

          <button
            onClick={toggleFavorite}
            className="flex items-center gap-1 text-sm"
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <BookmarkIcon
              className={`w-5 h-5 ${
                isFavorite
                  ? "fill-primary text-primary"
                  : "text-muted-foreground"
              }`}
            />
            <span>{isFavorite ? "Favorited" : "Add to favorites"}</span>
          </button>
        </div>

        <h1 className="text-2xl font-bold">Deep Breathing Technique</h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="flex items-center text-muted-foreground text-sm">
            <ClockIcon className="w-4 h-4 mr-1" />
            5-10 minutes
          </span>
          <span className="bg-success/10 text-success text-xs px-2 py-0.5 rounded">
            Beginner
          </span>
        </div>
      </div>

      {/* Introduction */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">About This Technique</h2>
        <p className="mb-4">
          Deep breathing (also called diaphragmatic breathing) is one of the
          most fundamental and effective relaxation techniques. It activates
          your body&apos;s natural relaxation response by engaging the
          parasympathetic nervous system, which helps counteract the stress
          response.
        </p>
        <p>
          This technique is particularly effective before bedtime to calm your
          mind and body, preparing you for sleep. It can also be used anytime
          you feel anxious or have racing thoughts.
        </p>
      </div>

      {/* Start button or progress */}
      {!isStarted ? (
        <div className="bg-primary text-white rounded-lg p-6 mb-6 text-center">
          <h2 className="text-xl font-semibold mb-3">Ready to begin?</h2>
          <p className="mb-4">
            Find a quiet, comfortable space where you won&apos;t be disturbed
            for the next 5-10 minutes. You can practice this technique sitting
            up or lying down.
          </p>
          <button
            onClick={() => setIsStarted(true)}
            className="inline-flex items-center px-6 py-3 bg-white text-primary font-medium rounded-md hover:bg-primary-light/10 transition-colors"
          >
            <PlayIcon className="w-5 h-5 mr-2" />
            Start Deep Breathing
          </button>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Follow these steps</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {completedSteps.length}/{steps.length} completed
              </span>
              <button
                onClick={resetProgress}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Reset progress"
              >
                <ArrowPathIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex p-3 rounded-md ${
                  completedSteps.includes(index)
                    ? "bg-primary/10 border-l-4 border-primary"
                    : "bg-muted"
                }`}
              >
                <div className="mr-3 mt-0.5">
                  <button
                    onClick={() => toggleStepCompletion(index)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      completedSteps.includes(index)
                        ? "bg-primary text-white"
                        : "bg-card border border-muted-foreground text-muted-foreground"
                    }`}
                  >
                    {completedSteps.includes(index) ? (
                      <CheckIcon className="w-4 h-4" />
                    ) : (
                      <span className="text-xs">{index + 1}</span>
                    )}
                  </button>
                </div>
                <div>
                  <p
                    className={
                      completedSteps.includes(index)
                        ? "text-primary font-medium"
                        : ""
                    }
                  >
                    {step}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setCompletedSteps(steps.map((_, i) => i))}
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Mark All Complete
            </button>
          </div>
        </div>
      )}

      {/* Benefits Section */}
      <div className="bg-muted rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">Benefits</h2>
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tips Section */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">Tips for Better Practice</h2>
        <ul className="space-y-3">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start">
              <span className="flex-shrink-0 w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center mr-2 mt-0.5">
                <span className="text-xs">{index + 1}</span>
              </span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Additional Resources */}
      <div className="bg-muted rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3">Related Techniques</h2>
        <p className="mb-4">
          If you find this technique helpful, you might also want to try:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { name: "4-7-8 Breathing", path: "/relaxation/478-breathing" },
            {
              name: "Progressive Muscle Relaxation",
              path: "/relaxation/progressive-muscle-relaxation",
            },
            {
              name: "Mindful Breathing",
              path: "/relaxation/mindful-breathing",
            },
          ].map((related, index) => (
            <Link
              key={index}
              href={related.path}
              className="bg-card border border-border rounded-md p-3 hover:border-primary transition-colors"
            >
              <span className="font-medium">{related.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
