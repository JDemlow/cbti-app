// app/(app)/relaxation/478-breathing/page.tsx
"use client";

import TechniqueDetail from "@/components/relaxation/TechniqueDetail";

export default function BreathingTechniquePage() {
  const techniqueDef = {
    title: "4-7-8 Breathing Technique",
    description: `The 4-7-8 breathing technique, developed by Dr. Andrew Weil, is a powerful breathing method that promotes relaxation by activating the parasympathetic nervous system. This simple breathing pattern—inhaling for 4 counts, holding for 7 counts, and exhaling for 8 counts—acts as a natural tranquilizer for your nervous system, helping quiet racing thoughts and prepare your mind and body for sleep.`,
    duration: "5 min",
    difficulty: "easy" as const,
    steps: [
      {
        text: "Find a comfortable seated position or lie down on your back.",
      },
      {
        text: "Place the tip of your tongue against the ridge behind your upper front teeth and keep it there throughout the exercise.",
      },
      {
        text: "Exhale completely through your mouth, making a whoosh sound.",
      },
      {
        text: "Close your mouth and inhale quietly through your nose to a mental count of 4.",
      },
      {
        text: "Hold your breath for a count of 7.",
      },
      {
        text: "Exhale completely through your mouth, making a whoosh sound to a count of 8.",
      },
      {
        text: "This is one complete breath. Now repeat the cycle three more times for a total of four breaths.",
      },
      {
        text: "As you become more comfortable with the technique, you can gradually increase to eight cycles per session.",
      },
    ],
    benefits: [
      { text: "Reduces anxiety and stress quickly" },
      { text: "Helps manage cravings and compulsive behaviors" },
      { text: "Lowers heart rate and blood pressure" },
      { text: "Promotes mental calmness and clarity" },
      { text: "Can help with falling asleep faster" },
      {
        text: "Provides a quick way to return to a relaxed state when feeling stressed",
      },
    ],
    tips: [
      {
        text: "The key to this technique is the ratio of 4:7:8 - adjust the actual time if needed, but keep the ratio intact",
      },
      {
        text: "It's normal to feel slightly lightheaded at first - this will pass with practice",
      },
      {
        text: "Practice at least twice daily, ideally once in the morning and once before bed",
      },
      {
        text: "For maximum benefit, practice consistently for at least 8 weeks",
      },
      {
        text: "Start with just 4 breath cycles and work your way up to 8 cycles over time",
      },
    ],
    relatedTechniques: [
      { name: "Deep Breathing", path: "/relaxation/deep-breathing" },
      { name: "Mindful Breathing", path: "/relaxation/mindful-breathing" },
      { name: "Body Scan Meditation", path: "/relaxation/body-scan" },
    ],
  };

  return <TechniqueDetail {...techniqueDef} defaultTimerMinutes={5} />;
}
