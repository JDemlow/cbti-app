// app/(app)/learn/page.tsx
import Link from "next/link";
import {
  BookOpenIcon,
  LightBulbIcon,
  QuestionMarkCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function LearnPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Welcome to the RealSleep Learning Center
      </h1>
      <p className="mb-6 text-muted-foreground">
        Explore our educational resources to learn more about sleep science,
        CBT-I, and techniques to improve your sleep quality.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-muted rounded-lg p-5 hover:bg-muted/80 transition-colors">
          <div className="flex items-center mb-3">
            <div className="bg-primary/10 p-2 rounded-md mr-3">
              <BookOpenIcon className="w-6 h-6 text-primary" />
            </div>
            <h2 className="font-bold text-lg">CBT-I Basics</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Learn about Cognitive Behavioral Therapy for Insomnia, the science
            behind it, and why it&apos;s the most effective non-drug treatment
            for sleep problems.
          </p>
          <Link
            href="/learn/cbt-i"
            className="text-primary flex items-center text-sm font-medium"
          >
            Read More <ArrowRightIcon className="ml-1 w-4 h-4" />
          </Link>
        </div>

        <div className="bg-muted rounded-lg p-5 hover:bg-muted/80 transition-colors">
          <div className="flex items-center mb-3">
            <div className="bg-primary/10 p-2 rounded-md mr-3">
              <LightBulbIcon className="w-6 h-6 text-primary" />
            </div>
            <h2 className="font-bold text-lg">Sleep Hygiene</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Discover practical tips and habits that can improve your sleep
            environment and routines to promote better, more restful sleep.
          </p>
          <Link
            href="/learn/sleep-hygiene"
            className="text-primary flex items-center text-sm font-medium"
          >
            Read More <ArrowRightIcon className="ml-1 w-4 h-4" />
          </Link>
        </div>

        <div className="bg-muted rounded-lg p-5 hover:bg-muted/80 transition-colors">
          <div className="flex items-center mb-3">
            <div className="bg-primary/10 p-2 rounded-md mr-3">
              <QuestionMarkCircleIcon className="w-6 h-6 text-primary" />
            </div>
            <h2 className="font-bold text-lg">Frequently Asked Questions</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Find answers to common questions about insomnia, sleep disorders,
            and how to use the RealSleep program effectively.
          </p>
          <Link
            href="/learn/faq"
            className="text-primary flex items-center text-sm font-medium"
          >
            Read More <ArrowRightIcon className="ml-1 w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="p-6 border border-border rounded-lg bg-background mb-6">
        <h2 className="font-bold text-xl mb-3">
          Why Education Matters for Sleep
        </h2>
        <p className="mb-4">
          Understanding the science behind sleep can help you make better
          decisions about your sleep habits. When you know why certain behaviors
          affect your sleep, you&apos;re more likely to make positive changes.
        </p>
        <p>
          The resources in this learning center are designed to complement your
          journey with RealSleep, helping you gain the knowledge you need to
          tackle sleep problems effectively.
        </p>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="font-bold text-lg mb-4">Additional Topics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors">
            <div className="bg-muted p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Z"></path>
                <path d="M12 8v4l3 3"></path>
              </svg>
            </div>
            <div>
              <h4 className="font-medium">Sleep Restriction Therapy</h4>
              <p className="text-sm text-muted-foreground">
                Learn how to consolidate your sleep for better quality
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors">
            <div className="bg-muted p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="m9 9 2 2 4-4"></path>
                <path d="m9 15 2 2 4-4"></path>
              </svg>
            </div>
            <div>
              <h4 className="font-medium">Stimulus Control</h4>
              <p className="text-sm text-muted-foreground">
                Strengthen the association between your bed and sleep
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors">
            <div className="bg-muted p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path>
                <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path>
                <circle cx="12" cy="12" r="2"></circle>
                <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path>
                <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path>
              </svg>
            </div>
            <div>
              <h4 className="font-medium">Sleep Technology</h4>
              <p className="text-sm text-muted-foreground">
                How to use technology to enhance your sleep
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors">
            <div className="bg-muted p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l4 2"></path>
              </svg>
            </div>
            <div>
              <h4 className="font-medium">Circadian Rhythms</h4>
              <p className="text-sm text-muted-foreground">
                Understanding your body&apos;s natural sleep-wake cycle
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
