// app/(app)/learn/sleep-hygiene/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Sleep Hygiene Tips | RealSleep",
  description:
    "Practical sleep hygiene tips and habits to improve your sleep quality and overall sleep health",
};

interface SleepTip {
  title: string;
  description: string;
}

const daytimeTips: SleepTip[] = [
  {
    title: "Get daily sunlight exposure",
    description:
      "Spend at least 30 minutes outdoors in natural light each day, preferably in the morning. Sunlight helps regulate your circadian rhythm and increases production of serotonin.",
  },
  {
    title: "Exercise regularly",
    description:
      "Aim for at least 30 minutes of moderate exercise most days, but try to complete workouts at least 3-4 hours before bedtime.",
  },
  {
    title: "Limit caffeine and nicotine",
    description:
      "Avoid caffeine (coffee, tea, cola, chocolate) at least 6 hours before bedtime. Consider cutting off caffeine after noon if you're sensitive. Avoid nicotine entirely if possible.",
  },
  {
    title: "Moderate alcohol consumption",
    description:
      "While alcohol might help you fall asleep initially, it disrupts sleep quality and REM sleep. Avoid alcohol within 3 hours of bedtime.",
  },
  {
    title: "Watch your napping habits",
    description:
      "If you nap, keep it short (20-30 minutes) and before 3pm. Long or late-day naps can make it harder to fall asleep at night.",
  },
];

const eveningTips: SleepTip[] = [
  {
    title: "Develop a relaxing bedtime routine",
    description:
      "Establish a consistent 30-60 minute routine before bed that includes relaxing activities like reading, gentle stretching, or taking a warm bath.",
  },
  {
    title: "Limit screen time",
    description:
      "The blue light from screens can suppress melatonin production. Try to avoid phones, tablets, computers, and TV at least 1 hour before bed, or use blue light filters/glasses.",
  },
  {
    title: "Have a light evening snack if hungry",
    description:
      "Avoid going to bed hungry or overly full. If needed, choose a light, sleep-promoting snack like a small banana, a few nuts, or some yogurt.",
  },
  {
    title: "Avoid heavy or spicy meals",
    description:
      "Eat dinner at least 3 hours before bedtime. Heavy, rich, or spicy foods can cause indigestion and discomfort that interfere with sleep.",
  },
  {
    title: "Manage fluid intake",
    description:
      "Stay hydrated throughout the day, but reduce fluids 1-2 hours before bed to minimize nighttime bathroom trips.",
  },
];

const bedroomTips: SleepTip[] = [
  {
    title: "Create a sleep sanctuary",
    description:
      "Make your bedroom quiet, dark, and cool (around 65°F or 18°C). Use blackout curtains, eye masks, earplugs, white noise machines, or fans if needed.",
  },
  {
    title: "Invest in a comfortable mattress and pillows",
    description:
      "Your bed should be comfortable and supportive. Most mattresses need replacement every 7-10 years.",
  },
  {
    title: "Reserve your bed for sleep and intimacy only",
    description:
      "Don't use your bed for working, eating, watching TV, or scrolling on your phone. This helps your brain associate your bed with sleep.",
  },
  {
    title: "Keep electronics out of the bedroom",
    description:
      "Remove TVs, computers, and phones from your bedroom, or at least keep them out of reach from your bed.",
  },
  {
    title: "Consider sleep-promoting scents",
    description:
      "Lavender, chamomile, and other calming scents may help promote relaxation. Try a linen spray or essential oil diffuser (used safely).",
  },
];

const sleepScheduleTips: SleepTip[] = [
  {
    title: "Maintain a consistent sleep schedule",
    description:
      "Go to bed and wake up at the same time every day, including weekends. This helps regulate your body's internal clock.",
  },
  {
    title: "Follow the 15-minute rule",
    description:
      "If you can't fall asleep after 15-20 minutes, get out of bed and do something relaxing in dim light until you feel sleepy.",
  },
  {
    title: "Don't watch the clock",
    description:
      "Turn your clock away from view. Watching the time can increase anxiety about not sleeping.",
  },
  {
    title: "Get up at the same time regardless of sleep quality",
    description:
      "Even if you slept poorly, maintain your regular wake time to help reinforce your body's sleep-wake cycle.",
  },
  {
    title: "Expose yourself to morning light",
    description:
      "Open curtains or go outside shortly after waking to signal to your body that it's time to be alert.",
  },
];

export default function SleepHygienePage() {
  return (
    <div className="prose max-w-none">
      <h1 className="mb-6">Sleep Hygiene: Healthy Habits for Better Sleep</h1>

      <div className="bg-muted p-4 rounded-md mb-6">
        <p className="font-medium">
          Sleep hygiene refers to the habits and practices that are conducive to
          sleeping well on a regular basis. Good sleep hygiene is a foundation
          of effective CBT-I treatment and can help improve sleep quality for
          almost everyone.
        </p>
      </div>

      <p>
        While sleep hygiene alone is often not enough to resolve chronic
        insomnia, these practices create the optimal conditions for good sleep
        and complement other treatment approaches. Below you&apos;ll find
        practical tips organized by category.
      </p>

      <h2>Daytime Habits</h2>
      <div className="space-y-4 mb-8">
        {daytimeTips.map((tip, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-md p-4"
          >
            <h3 className="flex items-center gap-2 text-lg font-bold mb-2">
              <CheckCircleIcon className="w-5 h-5 text-primary" />
              {tip.title}
            </h3>
            <p className="text-muted-foreground mb-0">{tip.description}</p>
          </div>
        ))}
      </div>

      <h2>Evening Routine</h2>
      <div className="space-y-4 mb-8">
        {eveningTips.map((tip, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-md p-4"
          >
            <h3 className="flex items-center gap-2 text-lg font-bold mb-2">
              <CheckCircleIcon className="w-5 h-5 text-primary" />
              {tip.title}
            </h3>
            <p className="text-muted-foreground mb-0">{tip.description}</p>
          </div>
        ))}
      </div>

      <h2>Sleep Environment</h2>
      <div className="space-y-4 mb-8">
        {bedroomTips.map((tip, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-md p-4"
          >
            <h3 className="flex items-center gap-2 text-lg font-bold mb-2">
              <CheckCircleIcon className="w-5 h-5 text-primary" />
              {tip.title}
            </h3>
            <p className="text-muted-foreground mb-0">{tip.description}</p>
          </div>
        ))}
      </div>

      <h2>Sleep Schedule</h2>
      <div className="space-y-4 mb-8">
        {sleepScheduleTips.map((tip, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-md p-4"
          >
            <h3 className="flex items-center gap-2 text-lg font-bold mb-2">
              <CheckCircleIcon className="w-5 h-5 text-primary" />
              {tip.title}
            </h3>
            <p className="text-muted-foreground mb-0">{tip.description}</p>
          </div>
        ))}
      </div>

      <h2>Special Considerations</h2>

      <h3>Diet and Sleep</h3>
      <p>
        Some foods can promote sleep while others can disrupt it. Consider
        including these sleep-friendly foods in your diet:
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li>Foods containing tryptophan (milk, turkey, chicken, eggs)</li>
        <li>Complex carbohydrates (whole grains, oats)</li>
        <li>Magnesium-rich foods (leafy greens, nuts, seeds)</li>
        <li>Certain fruits (cherries, kiwi, bananas)</li>
        <li>Herbal teas (chamomile, valerian, passionflower)</li>
      </ul>

      <h3>Sleep and Technology</h3>
      <p>
        While technology can disrupt sleep, it can also be used intentionally to
        support good sleep habits:
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li>Use built-in night modes on devices that reduce blue light</li>
        <li>Try apps that guide meditation or relaxation exercises</li>
        <li>
          Consider smart home features that automatically dim lights at night
        </li>
        <li>
          Use sleep tracking to better understand your patterns (but don&apos;t
          become obsessed with the data)
        </li>
        <li>Set automatic Do Not Disturb modes during sleep hours</li>
      </ul>

      <div className="bg-primary/10 border border-primary/20 rounded-md p-4 my-6">
        <h3 className="text-primary font-bold mb-2">
          Start Small and Be Consistent
        </h3>
        <p className="mb-0">
          You don&apos;t need to implement all these tips at once. Choose 2-3
          areas to focus on first, and gradually incorporate more as these
          become habits. Consistency is more important than perfection.
        </p>
      </div>

      <h2>Track Your Progress with RealSleep</h2>
      <p>
        The RealSleep app can help you track how changes to your sleep hygiene
        affect your sleep quality. By logging your sleep and habits
        consistently, you&apos;ll discover which practices have the biggest
        impact on your individual sleep patterns.
      </p>

      <div className="mt-8 pt-4 border-t border-border">
        <h3>Further Reading</h3>
        <ul className="list-disc pl-5">
          <li>
            <Link href="/learn/cbt-i" className="text-primary hover:underline">
              Learn about the CBT-I approach to improving sleep
            </Link>
          </li>
          <li>
            <a
              href="https://www.cdc.gov/sleep/about_sleep/sleep_hygiene.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              CDC: Sleep Hygiene Tips
            </a>
          </li>
          <li>
            <a
              href="https://www.sleepfoundation.org/sleep-hygiene"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              National Sleep Foundation: Sleep Hygiene
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
