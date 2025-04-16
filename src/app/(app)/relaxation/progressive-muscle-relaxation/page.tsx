"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ClockIcon,
  PlayIcon,
  ArrowPathIcon,
  BookmarkIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import RelaxationTimer from "@/components/relaxation/RelaxationTimer";

export default function ProgressiveMuscleRelaxationPage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [currentMuscleGroup, setCurrentMuscleGroup] = useState(0);

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
    setCurrentMuscleGroup(0);
  };

  // Define the steps for PMR technique
  const steps = [
    "Find a comfortable position in a quiet place where you won't be disturbed.",
    "Take a few deep breaths to begin relaxing your body.",
    "For each muscle group, tense the muscles for 5 seconds, then relax for 10-15 seconds.",
    "Notice the difference between the tension and relaxation sensation.",
    "Work through each muscle group from head to toe, or toe to head.",
    "Continue breathing deeply throughout the exercise.",
    "When finished, take a moment to notice how your body feels.",
  ];

  // Define muscle groups for PMR
  const muscleGroups = [
    {
      name: "Hands and Forearms",
      instruction:
        "Clench your fists tightly for 5 seconds, then release and let your hands relax completely for 15 seconds.",
    },
    {
      name: "Upper Arms (Biceps)",
      instruction:
        "Bend your elbows and tense your biceps for 5 seconds, then release and let them relax for 15 seconds.",
    },
    {
      name: "Shoulders",
      instruction:
        "Raise your shoulders up toward your ears, hold for 5 seconds, then release and relax for 15 seconds.",
    },
    {
      name: "Neck",
      instruction:
        "Gently press your head back against a surface (or in the air), hold for 5 seconds, then release and relax for 15 seconds.",
    },
    {
      name: "Face",
      instruction:
        "Scrunch up your entire face tightly for 5 seconds, then release and relax for 15 seconds.",
    },
    {
      name: "Chest and Back",
      instruction:
        "Take a deep breath, hold it while tensing your chest and back, hold for 5 seconds, then exhale and relax for 15 seconds.",
    },
    {
      name: "Abdomen",
      instruction:
        "Tighten your stomach muscles for 5 seconds, then release and relax for 15 seconds.",
    },
    {
      name: "Upper Legs (Quadriceps)",
      instruction:
        "Tense your thighs by straightening your legs or pressing them against the floor/bed, hold for 5 seconds, then release and relax for 15 seconds.",
    },
    {
      name: "Lower Legs (Calves)",
      instruction:
        "Point your toes upward to stretch your calves, hold for 5 seconds, then release and relax for 15 seconds.",
    },
    {
      name: "Feet",
      instruction:
        "Curl your toes downward, hold for 5 seconds, then release and relax for 15 seconds.",
    },
  ];

  // Benefits of this technique
  const benefits = [
    "Reduces physical tension throughout the body",
    "Helps identify and release unconscious muscle tension",
    "Decreases anxiety and stress levels",
    "Improves awareness of the sensation of relaxation",
    "Can help reduce certain types of chronic pain",
    "Particularly helpful for people with physical tension or racing thoughts",
  ];

  // Tips for better practice
  const tips = [
    "Don't tense your muscles so much that it causes pain or cramping",
    "If you have injuries or medical conditions in certain areas, skip those muscle groups",
    "Practice in a comfortable position where your body is well supported",
    "It's normal for your mind to wander; gently bring your focus back to the exercise",
    "For sleep preparation, practice PMR in bed as part of your bedtime routine",
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

        <h1 className="text-2xl font-bold">Progressive Muscle Relaxation</h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="flex items-center text-muted-foreground text-sm">
            <ClockIcon className="w-4 h-4 mr-1" />
            15-20 minutes
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
          Progressive Muscle Relaxation (PMR) was developed in the 1920s by Dr.
          Edmund Jacobson. This technique involves systematically tensing and
          then relaxing different muscle groups throughout your body to create
          awareness of tension and relaxation.
        </p>
        <p>
          PMR is particularly effective for people who hold tension in their
          body, especially those who may not be aware of their physical tension.
          It&apos;s also helpful for those who have racing thoughts before bed,
          as it redirects focus to physical sensations instead.
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Follow these steps</h2>
            <div className="flex items-center gap-2">
              <RelaxationTimer defaultMinutes={5} />
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

          {/* General steps */}
          <div className="space-y-4 mb-6">
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

          {/* Muscle group sequence */}
          <h3 className="font-medium text-lg mb-3">Muscle Group Sequence</h3>
          <div className="mb-4">
            <div className="bg-muted p-4 rounded-md mb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">
                  Current Group: {muscleGroups[currentMuscleGroup].name}
                </h4>
                <span className="text-xs text-muted-foreground">
                  {currentMuscleGroup + 1}/{muscleGroups.length}
                </span>
              </div>
              <p>{muscleGroups[currentMuscleGroup].instruction}</p>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() =>
                  setCurrentMuscleGroup((prev) => Math.max(0, prev - 1))
                }
                disabled={currentMuscleGroup === 0}
                className="px-3 py-1 border border-input rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentMuscleGroup((prev) =>
                    Math.min(muscleGroups.length - 1, prev + 1)
                  )
                }
                disabled={currentMuscleGroup === muscleGroups.length - 1}
                className="px-3 py-1 bg-primary text-white rounded-md disabled:opacity-50"
              >
                Next Group
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setCompletedSteps(steps.map((_, i) => i))}
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Mark All Steps Complete
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
            { name: "Body Scan Meditation", path: "/relaxation/body-scan" },
            { name: "Deep Breathing", path: "/relaxation/deep-breathing" },
            {
              name: "Peaceful Place Visualization",
              path: "/relaxation/visualization",
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
