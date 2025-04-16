// app/(app)/relaxation/mindful-breathing/page.tsx
"use client";

import TechniqueDetail from "@/components/relaxation/TechniqueDetail";

export default function MindfulBreathingPage() {
  const techniqueDef = {
    title: "Mindful Breathing",
    description: `Mindful breathing is a foundational meditation practice that involves paying attention to your breath without trying to change it. This technique helps you develop awareness of present-moment sensations, quiets mental chatter, and creates a sense of calm. By simply observing your natural breathing pattern with non-judgmental awareness, you can reduce stress, quiet racing thoughts, and prepare your mind for restful sleep.`,
    duration: "10-15 min",
    difficulty: "medium" as const,
    steps: [
      {
        text: "Find a comfortable position, either sitting with your back straight or lying down.",
      },
      {
        text: "Allow your body to relax, letting your shoulders drop and your hands rest comfortably.",
      },
      {
        text: "Bring your attention to the natural rhythm of your breath, without trying to control it.",
      },
      {
        text: "Notice where you feel your breath most prominently—perhaps at your nostrils, chest, or abdomen.",
      },
      {
        text: "Focus on the sensations of breathing: the feeling of air entering and leaving, the rise and fall of your chest or abdomen.",
      },
      {
        text: "When you notice your mind has wandered (which is normal), gently bring your attention back to your breath without self-criticism.",
      },
      {
        text: "Observe the qualities of each breath—its length, temperature, texture, sound—with curiosity rather than judgment.",
      },
      {
        text: "Continue this practice of noticing your breath and returning your attention when it wanders for the duration of your session.",
      },
      {
        text: "As you conclude, take a moment to notice how your body and mind feel compared to when you started.",
      },
    ],
    benefits: [
      { text: "Reduces stress and anxiety" },
      { text: "Breaks patterns of rumination and racing thoughts" },
      { text: "Improves concentration and mental clarity" },
      { text: "Builds awareness of mind-body connection" },
      { text: "Creates mental space between thoughts and reactions" },
      { text: "Serves as a foundation for other meditation practices" },
    ],
    tips: [
      {
        text: "Start with shorter sessions (3-5 minutes) and gradually increase the duration",
      },
      {
        text: "Your mind will wander repeatedly—this is normal and not a sign of failure",
      },
      {
        text: "Practice returning to your breath with gentleness rather than frustration",
      },
      {
        text: "Try counting breaths (1 to 10, then restart) if it helps maintain focus",
      },
      {
        text: "For sleep preparation, practice in bed with eyes closed as part of your bedtime routine",
      },
    ],
    relatedTechniques: [
      { name: "Body Scan Meditation", path: "/relaxation/body-scan" },
      { name: "4-7-8 Breathing Technique", path: "/relaxation/478-breathing" },
      { name: "Deep Breathing", path: "/relaxation/deep-breathing" },
    ],
  };

  return <TechniqueDetail {...techniqueDef} defaultTimerMinutes={10} />;
}
