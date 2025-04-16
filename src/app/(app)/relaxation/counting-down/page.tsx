// app/(app)/relaxation/counting-down/page.tsx
"use client";

import TechniqueDetail from "@/components/relaxation/TechniqueDetail";

export default function SleepCountdownPage() {
  const techniqueDef = {
    title: "Sleep Countdown",
    description: `The Sleep Countdown technique is a simple but effective mental exercise that helps quiet an active mind before sleep. By counting backwards from 100, synchronized with your breathing, you create a rhythmic pattern that occupies your thoughts, prevents rumination, and gradually lulls your brain into a state conducive to sleep. This technique is particularly helpful for those who struggle with racing thoughts or anxiety at bedtime.`,
    duration: "5-10 min",
    difficulty: "easy" as const,
    steps: [
      {
        text: "Lie comfortably in bed with your eyes closed, ready for sleep.",
      },
      {
        text: "Take a few deep, relaxing breaths to prepare yourself.",
      },
      {
        text: "Begin by mentally saying the number '100' as you exhale.",
      },
      {
        text: "Breathe in naturally, and then say '99' on your next exhale.",
      },
      {
        text: "Continue this pattern, saying each number silently to yourself as you exhale.",
      },
      {
        text: "Focus your full attention on the numbers and your breathing.",
      },
      {
        text: "If your mind wanders or you lose count, gently return to where you think you left off, or start again at 100.",
      },
      {
        text: "Continue counting down until you fall asleep naturally.",
      },
      {
        text: "Don't worry about reaching zero—the goal is relaxation, not completion.",
      },
    ],
    benefits: [
      { text: "Occupies the mind with a simple, repetitive task" },
      { text: "Prevents racing thoughts and rumination" },
      { text: "Creates a rhythmic breathing pattern conducive to relaxation" },
      { text: "Easy to learn and practice without special training" },
      { text: "Can be done in bed as you're falling asleep" },
      { text: "Helps break cycles of sleep anxiety" },
    ],
    tips: [
      {
        text: "Focus on the sensory experience—how the numbers sound in your mind, the feeling of your breath",
      },
      {
        text: "Maintain a steady, slow pace with your counting",
      },
      {
        text: "If counting from 100 seems too long, start at 50 or 25",
      },
      {
        text: "Try visualizing each number as you say it for enhanced focus",
      },
      {
        text: "Don't get frustrated if you need to restart—this is normal and part of the process",
      },
    ],
    relatedTechniques: [
      { name: "4-7-8 Breathing Technique", path: "/relaxation/478-breathing" },
      { name: "Mindful Breathing", path: "/relaxation/mindful-breathing" },
      { name: "Bedtime Gratitude Practice", path: "/relaxation/gratitude" },
    ],
  };

  return <TechniqueDetail {...techniqueDef} defaultTimerMinutes={5} />;
}
