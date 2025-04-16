"use client";

import { useState } from "react";
import Link from "next/link";
import RelaxationTimer from "@/components/relaxation/RelaxationTimer";
import {
  ArrowLeftIcon,
  ClockIcon,
  PlayIcon,
  ArrowPathIcon,
  BookmarkIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

export default function BodyScanMeditationPage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isStarted, setIsStarted] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
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

  // Define the steps for Body Scan Meditation
  const steps = [
    "Find a comfortable position, either lying down or sitting in a supportive chair.",
    "Close your eyes and take a few deep, calming breaths.",
    "Begin to focus your attention on your toes, noticing any sensations without judgment.",
    "Gradually move your attention slowly up through your feet, ankles, and lower legs.",
    "Continue moving your awareness through your knees, thighs, and hips.",
    "Shift your focus to your lower back, abdomen, and then your chest.",
    "Move your attention to your upper back, shoulders, and upper arms.",
    "Bring awareness to your elbows, forearms, and hands.",
    "Focus on your neck and throat area.",
    "Slowly move your attention to your face, including jaw, cheeks, eyes, and forehead.",
    "Take a moment to sense your entire body as a whole.",
    "Gently bring your awareness back to your breath and the present moment.",
  ];

  // Benefits of this technique
  const benefits = [
    "Increases body awareness and mindfulness",
    "Reduces physical tension and stress",
    "Helps calm racing thoughts",
    "Improves ability to relax and let go of tension",
    "Can help manage chronic pain and discomfort",
    "Enhances mind-body connection",
  ];

  // Tips for better practice
  const tips = [
    "Move slowly and deliberately through each body part",
    "If your mind wanders, gently bring it back to the body part you're focusing on",
    "Don't try to change any sensations, just observe them",
    "Practice in a quiet, comfortable environment",
    "It's normal for your mind to drift - this is part of the practice",
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

          <div className="flex items-center gap-2">
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
        </div>

        <h1 className="text-2xl font-bold">Body Scan Meditation</h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="flex items-center text-muted-foreground text-sm">
            <ClockIcon className="w-4 h-4 mr-1" />
            10-20 minutes
          </span>
          <span className="bg-warning/10 text-warning text-xs px-2 py-0.5 rounded">
            Intermediate
          </span>
        </div>
      </div>

      {/* Introduction */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">About This Technique</h2>
        <p className="mb-4">
          Body Scan Meditation is a mindfulness practice that involves
          systematically focusing your attention on different parts of your
          body, from toes to head. This technique helps you develop a deeper
          awareness of bodily sensations, release tension, and cultivate a sense
          of calm and presence.
        </p>
        <p>
          By methodically moving your attention through your body, you learn to
          observe sensations without judgment, which can help reduce stress,
          anxiety, and physical tension.
        </p>
      </div>

      {/* Start button or progress */}
      {!isStarted ? (
        <div className="bg-primary text-white rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0 md:mr-4">
              <h2 className="text-xl font-semibold mb-3">Ready to begin?</h2>
              <p className="mb-0">
                Find a quiet, comfortable space where you won&apos;t be
                disturbed for the next 5-10 minutes.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsStarted(true)}
                className="inline-flex items-center px-6 py-3 bg-white text-primary font-medium rounded-md hover:bg-primary-light/10 transition-colors"
              >
                <PlayIcon className="w-5 h-5 mr-2" />
                Start Technique
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Follow these steps</h2>
            <div className="flex flex-col md:flex-row items-center gap-2">
              <RelaxationTimer defaultMinutes={5} className="hidden md:block" />
              <span className="text-sm text-muted-foreground ml-2">
                {completedSteps.length}/{steps.length} completed
              </span>
              <button
                onClick={resetProgress}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Reset progress"
              >
                <ArrowPathIcon className="w-5 h-5" />
              </button>
              <RelaxationTimer defaultMinutes={5} className="md:hidden" />
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
            {
              name: "Progressive Muscle Relaxation",
              path: "/relaxation/progressive-muscle-relaxation",
            },
            {
              name: "Peaceful Place Visualization",
              path: "/relaxation/visualization",
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
