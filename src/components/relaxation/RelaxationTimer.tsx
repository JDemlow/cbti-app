"use client";

import { useState, useEffect } from "react";
import {
  PlayIcon,
  PauseIcon,
  ArrowPathIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface RelaxationTimerProps {
  defaultMinutes?: number;
  onComplete?: () => void;
  className?: string;
}

const RelaxationTimer: React.FC<RelaxationTimerProps> = ({
  defaultMinutes = 5,
  onComplete,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(defaultMinutes * 60);
  const [currentSeconds, setCurrentSeconds] = useState(totalSeconds);
  const [customMinutes, setCustomMinutes] = useState(defaultMinutes.toString());

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && currentSeconds > 0) {
      interval = setInterval(() => {
        setCurrentSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (onComplete) onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (currentSeconds === 0) {
      setIsRunning(false);
      if (onComplete) onComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, currentSeconds, onComplete]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const calculateProgress = (): number => {
    return (currentSeconds / totalSeconds) * 100;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentSeconds(totalSeconds);
  };

  const handleCustomTimeApply = () => {
    const mins = parseInt(customMinutes);
    if (!isNaN(mins) && mins > 0 && mins <= 60) {
      const newTotalSeconds = mins * 60;
      setTotalSeconds(newTotalSeconds);
      setCurrentSeconds(newTotalSeconds);
    }
  };

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={`${className}`}>
      <button
        onClick={toggleOpen}
        className="px-3 py-1.5 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center gap-1"
      >
        <ClockIcon className="w-4 h-4" />
        <span>Relaxation Timer</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg shadow-lg max-w-sm w-full p-5">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Relaxation Timer</h3>
              <button
                onClick={toggleOpen}
                className="text-muted-foreground hover:text-foreground"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Timer Display */}
            <div className="mb-6 text-center">
              <div className="relative w-36 h-36 mx-auto mb-3">
                {/* Progress Circle */}
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="6"
                  />
                  {/* Progress Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="282.7"
                    strokeDashoffset={
                      282.7 - (282.7 * calculateProgress()) / 100
                    }
                    transform="rotate(-90 50 50)"
                    className="text-primary"
                  />
                </svg>
                {/* Time Display */}
                <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                  {formatTime(currentSeconds)}
                </div>
              </div>

              {/* Set Custom Time */}
              {!isRunning && (
                <div className="mb-4 flex items-center justify-center">
                  <input
                    type="number"
                    value={customMinutes}
                    onChange={(e) => setCustomMinutes(e.target.value)}
                    min="1"
                    max="60"
                    className="w-16 rounded-md border border-input bg-background px-2 py-1 text-sm text-center mr-2"
                  />
                  <span className="text-sm mr-2">minutes</span>
                  <button
                    onClick={handleCustomTimeApply}
                    className="px-2 py-1 text-xs bg-muted text-foreground rounded hover:bg-muted/80"
                  >
                    Apply
                  </button>
                </div>
              )}

              {/* Controls */}
              <div className="flex justify-center items-center gap-4">
                {isRunning ? (
                  <button
                    onClick={handlePause}
                    className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <PauseIcon className="w-6 h-6" />
                  </button>
                ) : (
                  <button
                    onClick={handleStart}
                    className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors"
                  >
                    <PlayIcon className="w-6 h-6" />
                  </button>
                )}
                <button
                  onClick={handleReset}
                  className="w-10 h-10 rounded-full border border-input flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                >
                  <ArrowPathIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Instruction */}
            <p className="text-sm text-muted-foreground text-center">
              {isRunning
                ? "Focus on your relaxation technique..."
                : "Set your desired time and press play"}
            </p>

            {/* Complete Button */}
            {currentSeconds === 0 && (
              <div className="mt-4 text-center">
                <button
                  onClick={toggleOpen}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                >
                  Complete
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RelaxationTimer;

// Missing import at the top of the file
import { ClockIcon } from "@heroicons/react/24/outline";
