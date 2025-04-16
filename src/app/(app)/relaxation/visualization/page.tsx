"use client";

import TechniqueDetail from "@/components/relaxation/TechniqueDetail";

export default function VisualizationPage() {
  const techniqueDef = {
    title: "Peaceful Place Visualization",
    description: `Visualization is a powerful relaxation technique that uses your imagination to create a detailed mental image of a peaceful, safe place. By immersing yourself in this calming mental environment, you can reduce stress, ease anxiety, and prepare your mind for sleep. This technique is particularly helpful for people whose minds are active with racing thoughts or worries at bedtime.`,
    duration: "10-15 min",
    difficulty: "medium" as const,
    steps: [
      {
        text: "Find a comfortable position in a quiet place where you can relax without interruptions.",
      },
      {
        text: "Close your eyes and take several slow, deep breaths to begin relaxing your body and mind.",
      },
      {
        text: "Think of a place where you feel perfectly peaceful, safe, and relaxed. This could be a real place you've visited or an imaginary location.",
      },
      {
        text: "Begin to build this peaceful place in your mind with as much detail as possible.",
      },
      {
        text: "Notice what you can see in this place - colors, textures, shapes, movement, light and shadows.",
      },
      {
        text: "Add sounds to your peaceful place - perhaps gentle waves, rustling leaves, or complete silence.",
      },
      {
        text: "Now add sensations - temperature, breeze on your skin, textures you might touch.",
      },
      {
        text: "Include any pleasant scents that might be present in your peaceful place.",
      },
      {
        text: "Spend several minutes fully immersed in this peaceful place, exploring it with all your senses.",
      },
      {
        text: "When ready to finish, slowly become aware of your body again, take a few deep breaths, and open your eyes.",
      },
    ],
    benefits: [
      { text: "Reduces mental activity and racing thoughts" },
      { text: "Creates distance from worries and stressors" },
      { text: "Induces the relaxation response in both mind and body" },
      { text: "Can be practiced anywhere and anytime" },
      { text: "Builds a mental resource you can return to whenever needed" },
      { text: "May help with falling asleep faster" },
    ],
    tips: [
      {
        text: "Choose a place that evokes strong positive feelings of peace and safety for you",
      },
      {
        text: "If your mind wanders, gently bring your attention back to building your peaceful place",
      },
      {
        text: "The more sensory details you include, the more effective the visualization will be",
      },
      {
        text: "Practice regularly to make it easier to enter your peaceful place quickly",
      },
      {
        text: "You can return to the same peaceful place each time or create different ones for variety",
      },
    ],
    relatedTechniques: [
      { name: "Body Scan Meditation", path: "/relaxation/body-scan" },
      { name: "4-7-8 Breathing Technique", path: "/relaxation/478-breathing" },
      { name: "Mindful Breathing", path: "/relaxation/mindful-breathing" },
    ],
  };

  return <TechniqueDetail {...techniqueDef} defaultTimerMinutes={10} />;
}
