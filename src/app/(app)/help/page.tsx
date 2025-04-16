// app/(app)/help/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  QuestionMarkCircleIcon,
  LifebuoyIcon,
  BookOpenIcon,
  WrenchScrewdriverIcon,
  ArrowTopRightOnSquareIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

type HelpCategory = "all" | "program" | "technical" | "account";
type FAQItem = {
  question: string;
  answer: React.ReactNode;
  category: HelpCategory | "all";
};

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<HelpCategory>("all");
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(
    new Set()
  );

  // Common FAQs
  const faqItems: FAQItem[] = [
    // Program Questions
    {
      question: "How does the 12-week program work?",
      answer: (
        <div>
          <p>
            Our program is structured to gradually introduce all the components
            of CBT-I (Cognitive Behavioral Therapy for Insomnia) over 12 weeks:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Weeks 1-2: Education and sleep tracking</li>
            <li>Weeks 3-5: Sleep restriction and stimulus control</li>
            <li>
              Weeks 6-8: Cognitive restructuring for sleep-related thoughts
            </li>
            <li>Weeks 9-10: Advanced relaxation techniques</li>
            <li>Weeks 11-12: Relapse prevention and long-term strategies</li>
          </ul>
          <p className="mt-2">
            Each week includes educational content, specific tasks, and progress
            tracking.
          </p>
        </div>
      ),
      category: "program",
    },
    {
      question:
        "Is it normal to feel worse before feeling better during CBT-I?",
      answer: (
        <div>
          <p>
            Yes, this is common, especially during the sleep restriction phase.
            Sleep restriction temporarily reduces time in bed to improve sleep
            efficiency, which can lead to increased sleepiness initially.
          </p>
          <p className="mt-2">
            Most users begin seeing improvements by weeks 3-4, with significant
            improvements by the end of the program. If you&apos;re experiencing
            severe daytime impairment, please consult the program guidelines for
            modifications or speak with a healthcare provider.
          </p>
        </div>
      ),
      category: "program",
    },
    {
      question: "How accurate does my sleep diary need to be?",
      answer: (
        <div>
          <p>
            Your sleep diary doesn&apos;t need to be perfectly accurate.
            Estimates are fine, especially for how long it takes to fall asleep
            or time spent awake during the night.
          </p>
          <p className="mt-2">
            The most important thing is consistency in how you record your sleep
            patterns. Try to complete your diary each morning while your sleep
            experience is fresh in your mind.
          </p>
        </div>
      ),
      category: "program",
    },
    {
      question: "Can I use sleep medication while using RealSleep?",
      answer: (
        <div>
          <p>
            Yes, many people successfully use RealSleep while gradually reducing
            their sleep medication under medical supervision.
          </p>
          <p className="mt-2">
            Never stop or reduce prescription sleep medication without
            consulting your healthcare provider. The app includes guidance on
            how CBT-I can complement medication use.
          </p>
        </div>
      ),
      category: "program",
    },

    // Technical Questions
    {
      question: "How do I reset my password?",
      answer: (
        <div>
          <p>To reset your password:</p>
          <ol className="list-decimal pl-5 space-y-1 mt-2">
            <li>Go to the login screen</li>
            <li>Click &quot;Forgot your password?&quot;</li>
            <li>Enter your email address</li>
            <li>Check your email for a reset link</li>
            <li>Follow the link to create a new password</li>
          </ol>
          <p className="mt-2">
            If you don&apos;t receive the email, check your spam folder or
            contact support for assistance.
          </p>
        </div>
      ),
      category: "technical",
    },
    {
      question: "How do I export my sleep data?",
      answer: (
        <div>
          <p>To export your sleep data:</p>
          <ol className="list-decimal pl-5 space-y-1 mt-2">
            <li>Go to Settings</li>
            <li>Select the &quot;Account&quot; tab</li>
            <li>Scroll down to &quot;Data & Privacy&quot;</li>
            <li>Click &quot;Export Sleep Data&quot;</li>
            <li>Choose your preferred format (CSV or PDF)</li>
          </ol>
          <p className="mt-2">
            The export includes all your sleep diary entries and calculated
            sleep metrics.
          </p>
        </div>
      ),
      category: "technical",
    },
    {
      question: "Does RealSleep work offline?",
      answer: (
        <div>
          <p>
            RealSleep requires an internet connection for most features.
            However, once loaded, the relaxation techniques and educational
            content can be accessed offline.
          </p>
          <p className="mt-2">
            Sleep diary entries made offline will sync to your account the next
            time you connect to the internet.
          </p>
        </div>
      ),
      category: "technical",
    },
    {
      question: "How do I set up or change notifications?",
      answer: (
        <div>
          <p>To manage your notifications:</p>
          <ol className="list-decimal pl-5 space-y-1 mt-2">
            <li>Go to Settings</li>
            <li>Select the &quot;Notifications&quot; tab</li>
            <li>Toggle on/off different notification types</li>
            <li>Set custom times for bedtime and diary reminders</li>
          </ol>
          <p className="mt-2">
            You can customize both in-app and email notifications separately.
          </p>
        </div>
      ),
      category: "technical",
    },

    // Account Questions
    {
      question: "How do I cancel my subscription?",
      answer: (
        <div>
          <p>To cancel your subscription:</p>
          <ol className="list-decimal pl-5 space-y-1 mt-2">
            <li>Go to Settings</li>
            <li>Select the &quot;Account&quot; tab</li>
            <li>Scroll down to &quot;Subscription&quot;</li>
            <li>Click &quot;Manage Subscription&quot;</li>
            <li>Select &quot;Cancel Subscription&quot;</li>
          </ol>
          <p className="mt-2">
            You&apos;ll retain access until the end of your current billing
            period. You can reactivate at any time.
          </p>
        </div>
      ),
      category: "account",
    },
    {
      question: "How is my sleep data used and protected?",
      answer: (
        <div>
          <p>Your privacy is our priority:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>All data is encrypted in transit and at rest</li>
            <li>Your data is never sold to third parties</li>
            <li>You can delete your data at any time from Settings</li>
            <li>We use anonymized, aggregated data for program improvement</li>
          </ul>
          <p className="mt-2">
            For complete details, please review our{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      ),
      category: "account",
    },
    {
      question: "Can I share my account with someone else?",
      answer: (
        <div>
          <p>
            RealSleep accounts are designed for individual use. Sharing your
            account with others will affect your personalized recommendations
            and progress tracking.
          </p>
          <p className="mt-2">
            If someone else in your household would like to use RealSleep, we
            recommend they create their own account.
          </p>
        </div>
      ),
      category: "account",
    },
    {
      question: "How do I delete my account?",
      answer: (
        <div>
          <p>To delete your account and all associated data:</p>
          <ol className="list-decimal pl-5 space-y-1 mt-2">
            <li>Go to Settings</li>
            <li>Select the &quot;Account&quot; tab</li>
            <li>Scroll to the bottom and select &quot;Delete Account&quot;</li>
            <li>Confirm your decision</li>
          </ol>
          <p className="mt-2">
            This action is permanent and cannot be undone. All your personal
            data will be permanently removed from our servers.
          </p>
        </div>
      ),
      category: "account",
    },
  ];

  // Toggle question expansion
  const toggleQuestion = (index: number) => {
    const updated = new Set(expandedQuestions);
    if (updated.has(index)) {
      updated.delete(index);
    } else {
      updated.add(index);
    }
    setExpandedQuestions(updated);
  };

  // Filter FAQs based on category and search query
  const filteredFAQs = faqItems.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof item.answer === "string" &&
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-2">Help Center</h1>
      <p className="text-muted-foreground mb-6">
        Find answers to common questions or reach out for support
      </p>

      {/* Search & Filter */}
      <div className="mb-6">
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for help..."
            className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3 py-1 rounded-md ${
              activeCategory === "all"
                ? "bg-primary text-white"
                : "bg-muted text-foreground"
            }`}
          >
            All Topics
          </button>
          <button
            onClick={() => setActiveCategory("program")}
            className={`px-3 py-1 rounded-md flex items-center gap-1 ${
              activeCategory === "program"
                ? "bg-primary text-white"
                : "bg-muted text-foreground"
            }`}
          >
            <BookOpenIcon className="w-4 h-4" />
            <span>Program</span>
          </button>
          <button
            onClick={() => setActiveCategory("technical")}
            className={`px-3 py-1 rounded-md flex items-center gap-1 ${
              activeCategory === "technical"
                ? "bg-primary text-white"
                : "bg-muted text-foreground"
            }`}
          >
            <WrenchScrewdriverIcon className="w-4 h-4" />
            <span>Technical</span>
          </button>
          <button
            onClick={() => setActiveCategory("account")}
            className={`px-3 py-1 rounded-md flex items-center gap-1 ${
              activeCategory === "account"
                ? "bg-primary text-white"
                : "bg-muted text-foreground"
            }`}
          >
            <QuestionMarkCircleIcon className="w-4 h-4" />
            <span>Account</span>
          </button>
        </div>
      </div>

      {/* Help Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Contact Support */}
        <div className="bg-card border border-border rounded-lg p-5 hover:border-primary transition-colors">
          <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
            <LifebuoyIcon className="w-5 h-5 text-primary" />
            Contact Support
          </h2>
          <p className="text-muted-foreground mb-3">
            Need personalized help? Our support team is available 7 days a week.
          </p>
          <div className="space-y-2">
            <a
              href="mailto:support@realsleep.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:underline cursor-pointer"
            >
              <EnvelopeIcon className="w-4 h-4" />
              support@realsleep.app
            </a>
            <p className="text-sm text-muted-foreground">
              Response time: Usually within 24 hours
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5 hover:border-primary transition-colors">
          <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
            <BookOpenIcon className="w-5 h-5 text-primary" />
            Learning Resources
          </h2>
          <p className="text-muted-foreground mb-3">
            Access our comprehensive library of articles and guides about CBT-I.
          </p>
          <Link
            href="/learn"
            className="flex items-center gap-1 text-primary hover:underline"
          >
            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            Visit Learning Center
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>

        {filteredFAQs.length === 0 ? (
          <div className="bg-muted p-6 rounded-lg text-center">
            <QuestionMarkCircleIcon className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground mb-2">
              No matching questions found
            </p>
            <p className="text-sm">
              Try adjusting your search terms or browse all categories
            </p>
          </div>
        ) : (
          <div className="space-y-3 mb-8">
            {filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="border border-border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full p-4 text-left flex justify-between items-center hover:bg-muted/50"
                >
                  <span className="font-medium pr-6">{faq.question}</span>
                  {expandedQuestions.has(index) ? (
                    <ChevronUpIcon className="w-5 h-5 flex-shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 flex-shrink-0 text-muted-foreground" />
                  )}
                </button>
                {expandedQuestions.has(index) && (
                  <div className="p-4 border-t border-border bg-muted/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Still Need Help */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
        <h3 className="text-lg font-bold mb-2">Still Need Help?</h3>
        <p className="mb-4 max-w-lg mx-auto">
          Can&apos;t find what you&apos;re looking for? Our support team is
          ready to assist you with any questions about your program or technical
          issues.
        </p>
        <a
          href="mailto:support@realsleep.app"
          className="inline-flex items-center px-4 py-2 bg-primary text-white
          rounded-md hover:bg-primary-dark transition-colors"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
