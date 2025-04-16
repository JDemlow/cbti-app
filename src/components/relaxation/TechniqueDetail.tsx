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
import RelaxationTimer from "./RelaxationTimer";

interface Step {
  text: string;
}

interface Benefit {
  text: string;
}

interface Tip {
  text: string;
}

interface RelatedTechnique {
  name: string;
  path: string;
}

interface TechniqueDetailProps {
  title: string;
  description: string;
  duration: string;
  difficulty: "easy" | "medium" | "hard";
  steps: Step[];
  benefits: Benefit[];
  tips: Tip[];
  relatedTechniques: RelatedTechnique[];
  defaultTimerMinutes?: number;
}

const TechniqueDetail: React.FC<TechniqueDetailProps> = ({
  title,
  description,
  duration,
  difficulty,
  steps,
  benefits,
  tips,
  relatedTechniques,
  defaultTimerMinutes = 5,
}) => {
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

  const getDifficultyBadge = () => {
    switch (difficulty) {
      case "easy":
        return (
          <span className="bg-success/10 text-success text-xs px-2 py-0.5 rounded">
            Beginner
          </span>
        );
      case "medium":
        return (
          <span className="bg-warning/10 text-warning text-xs px-2 py-0.5 rounded">
            Intermediate
          </span>
        );
      case "hard":
        return (
          <span className="bg-error/10 text-error text-xs px-2 py-0.5 rounded">
            Advanced
          </span>
        );
    }
  };

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

        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="flex items-center text-muted-foreground text-sm">
            <ClockIcon className="w-4 h-4 mr-1" />
            {duration}
          </span>
          {getDifficultyBadge()}
        </div>
      </div>

      {/* Introduction */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">About This Technique</h2>
        <p className="mb-0">{description}</p>
      </div>

      {/* Start button or progress */}
      {!isStarted ? (
        <div className="bg-primary text-white rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0 md:mr-4">
              <h2 className="text-xl font-semibold mb-3">Ready to begin?</h2>
              <p className="mb-0">
                Find a quiet, comfortable space where you won&apos;t be
                disturbed for the next {duration}.
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
              <RelaxationTimer
                defaultMinutes={defaultTimerMinutes}
                className="hidden md:block"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Follow these steps</h2>
            <div className="flex items-center gap-2">
              <RelaxationTimer defaultMinutes={defaultTimerMinutes} />
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
                    {step.text}
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
              <span>{benefit.text}</span>
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
              <span>{tip.text}</span>
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
          {relatedTechniques.map((related, index) => (
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
};

export default TechniqueDetail;
