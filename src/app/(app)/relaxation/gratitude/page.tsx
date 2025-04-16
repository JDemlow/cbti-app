// app/(app)/relaxation/gratitude/page.tsx
"use client";

import TechniqueDetail from "@/components/relaxation/TechniqueDetail";

export default function GratitudePracticePage() {
  const techniqueDef = {
    title: "Bedtime Gratitude Practice",
    description: `Bedtime gratitude practice is a simple yet powerful technique that involves reflecting on things you're thankful for before sleep. This practice helps shift your focus from worries or negative thoughts to positive aspects of your life, creating a sense of contentment and peace that can facilitate better sleep. Regular gratitude practice has been shown to reduce stress, improve mood, and enhance overall well-being.`,
    duration: "5-10 min",
    difficulty: "easy" as const,
    steps: [
      {
        text: "Find a comfortable position in bed, sitting or lying down.",
      },
      {
        text: "Take a few deep breaths to center yourself and relax your body.",
      },
      {
        text: "Reflect on your day and identify three specific things you're grateful for today.",
      },
      {
        text: "For each item, spend a moment genuinely feeling the gratitude rather than just listing it mentally.",
      },
      {
        text: "Consider why you're grateful for each item and how it enriched your day or life.",
      },
      {
        text: "If you wish, mentally express thanks to people who contributed positively to your day.",
      },
      {
        text: "Notice how your body feels as you practice gratitude - many people experience warmth, relaxation, or lightness.",
      },
      {
        text: "If worries or negative thoughts arise, gently acknowledge them and return to focusing on gratitude.",
      },
      {
        text: "Complete your practice with one final deep breath, carrying the feeling of gratitude with you as you prepare for sleep.",
      },
    ],
    benefits: [
      { text: "Shifts attention away from stress and worry" },
      { text: "Reduces rumination and racing thoughts" },
      { text: "Promotes positive emotions before sleep" },
      { text: "Helps create mental space between daytime stressors and sleep" },
      { text: "May increase overall life satisfaction and happiness" },
      { text: "Can be practiced anywhere, including in bed" },
    ],
    tips: [
      {
        text: "Be specific in your gratitude - instead of 'family,' think 'my sister's supportive phone call today'",
      },
      {
        text: "Include small, everyday things along with major events",
      },
      {
        text: "Try to find new things to be grateful for each day rather than repeating the same items",
      },
      {
        text: "Consider keeping a gratitude journal by your bed to jot down your items",
      },
      {
        text: "If you have trouble finding things to be grateful for, start with basics like having a bed, food, or shelter",
      },
    ],
    relatedTechniques: [
      {
        name: "Peaceful Place Visualization",
        path: "/relaxation/visualization",
      },
      { name: "Deep Breathing", path: "/relaxation/deep-breathing" },
      { name: "478 Breathing Technique", path: "/relaxation/478-breathing" },
    ],
  };

  return <TechniqueDetail {...techniqueDef} defaultTimerMinutes={5} />;
}
