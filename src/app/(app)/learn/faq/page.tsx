// app/(app)/learn/faq/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

interface FaqItem {
  question: string;
  answer: React.ReactNode;
  category: "general" | "insomnia" | "cbti" | "app";
}

const faqItems: FaqItem[] = [
  // General Sleep Questions
  {
    question: "How much sleep do I actually need?",
    answer: (
      <div>
        <p>
          Sleep needs vary by individual and age. Generally, adults need 7-9
          hours of sleep per night, though some people may function well with as
          little as 6 or as much as 10 hours.
        </p>
        <p>
          Rather than focusing solely on hours, pay attention to how you feel
          during the day. If you&apos;re consistently fatigued or experiencing
          cognitive issues despite getting what should be adequate sleep, you
          might need more rest or have a sleep disorder that needs addressing.
        </p>
      </div>
    ),
    category: "general",
  },
  {
    question:
      "Is it better to sleep in one long stretch or can I split my sleep?",
    answer: (
      <div>
        <p>
          While most sleep experts recommend getting your sleep in one
          consolidated period, there&apos;s historical and anthropological
          evidence that suggests humans haven&apos;t always slept in a single
          8-hour block.
        </p>
        <p>
          Some people practice &quot;biphasic sleep&quot; (a main sleep period
          plus a nap) or even &quot;polyphasic sleep&quot; (multiple shorter
          sleep periods). For most people with typical schedules, aiming for one
          primary sleep period at night is most practical and aligns best with
          our circadian rhythms.
        </p>
      </div>
    ),
    category: "general",
  },
  {
    question: "Does everyone dream every night?",
    answer: (
      <div>
        <p>
          Yes, most research suggests that everyone dreams every night, even
          those who don&apos;t remember their dreams. We typically have several
          dream episodes per night, occurring primarily during REM (Rapid Eye
          Movement) sleep.
        </p>
        <p>
          Dream recall varies widely among individuals. Some people rarely
          remember dreams, while others can recall multiple dreams in vivid
          detail. Factors affecting dream recall include how quickly you wake
          up, how deeply you were sleeping, and whether you wake during or
          shortly after a REM period.
        </p>
      </div>
    ),
    category: "general",
  },
  {
    question: "Can I catch up on lost sleep on the weekend?",
    answer: (
      <div>
        <p>
          While you can partially recover from sleep debt by sleeping longer on
          weekends, this strategy isn&apos;t ideal for several reasons:
        </p>
        <ul className="list-disc pl-5 my-2">
          <li>Irregular sleep schedules can disrupt your circadian rhythm</li>
          <li>
            You can&apos;t truly &quot;bank&quot; sleep or fully make up for
            chronic sleep deprivation
          </li>
          <li>
            This pattern can lead to &quot;social jet lag&quot; that makes
            Monday mornings particularly difficult
          </li>
        </ul>
        <p>
          It&apos;s better to maintain a consistent sleep schedule throughout
          the week and gradually adjust your schedule if you&apos;re
          consistently sleep-deprived.
        </p>
      </div>
    ),
    category: "general",
  },
  {
    question: "Are naps good or bad for nighttime sleep?",
    answer: (
      <div>
        <p>
          Naps can be either beneficial or detrimental to nighttime sleep,
          depending on several factors:
        </p>
        <p className="font-medium">Beneficial when:</p>
        <ul className="list-disc pl-5 my-2">
          <li>They&apos;re short (20-30 minutes)</li>
          <li>Taken earlier in the day (before 3pm)</li>
          <li>Used to supplement insufficient nighttime sleep</li>
        </ul>
        <p className="font-medium">Potentially harmful when:</p>
        <ul className="list-disc pl-5 my-2">
          <li>They&apos;re long (over 30 minutes, causing sleep inertia)</li>
          <li>Taken late in the day (reducing sleep pressure at bedtime)</li>
          <li>Used as a substitute for addressing chronic insomnia</li>
        </ul>
        <p>
          If you have insomnia, it&apos;s generally recommended to avoid naps
          completely until your sleep pattern improves.
        </p>
      </div>
    ),
    category: "general",
  },

  // Insomnia Questions
  {
    question: "What exactly is insomnia?",
    answer: (
      <div>
        <p>
          Insomnia is a sleep disorder characterized by difficulty falling
          asleep, staying asleep, or getting refreshing sleep, despite having
          adequate opportunity for sleep. To be diagnosed with insomnia
          disorder, these difficulties must:
        </p>
        <ul className="list-disc pl-5 my-2">
          <li>Occur at least three nights per week</li>
          <li>Persist for at least three months</li>
          <li>Cause significant distress or impairment in daily functioning</li>
          <li>
            Not be better explained by another sleep, medical, or mental health
            condition
          </li>
        </ul>
        <p>
          Insomnia can be primary (occurring on its own) or secondary/comorbid
          (occurring alongside other conditions).
        </p>
      </div>
    ),
    category: "insomnia",
  },
  {
    question: "What causes insomnia?",
    answer: (
      <div>
        <p>
          Insomnia has many potential causes and contributing factors,
          including:
        </p>
        <ul className="list-disc pl-5 my-2">
          <li>
            Psychological factors: Stress, anxiety, depression, worry, grief
          </li>
          <li>
            Medical conditions: Chronic pain, respiratory disorders,
            neurological conditions
          </li>
          <li>
            Lifestyle factors: Irregular sleep schedule, poor sleep habits,
            excessive caffeine or alcohol
          </li>
          <li>
            Environmental factors: Noise, light, uncomfortable room temperature
          </li>
          <li>
            Medications: Some antidepressants, asthma medications,
            corticosteroids
          </li>
        </ul>
        <p>
          Once insomnia develops, it&apos;s often perpetuated by unhelpful
          thoughts about sleep, counterproductive behaviors, and conditioned
          arousal to the bedroom environment.
        </p>
      </div>
    ),
    category: "insomnia",
  },
  {
    question: "How is insomnia different from occasional poor sleep?",
    answer: (
      <div>
        <p>
          Almost everyone experiences occasional poor sleep due to temporary
          stressors, schedule changes, or environmental factors. This type of
          situational poor sleep typically resolves when the triggering factor
          is addressed.
        </p>
        <p>Insomnia differs in several key ways:</p>
        <ul className="list-disc pl-5 my-2">
          <li>
            Persistence: Continues for months or years rather than a few nights
          </li>
          <li>Frequency: Occurs at least three nights per week</li>
          <li>
            Impact: Significantly affects daytime functioning and quality of
            life
          </li>
          <li>
            Self-perpetuation: Often maintained by behaviors and thoughts
            developed in response to poor sleep
          </li>
        </ul>
        <p>
          If your sleep difficulties persist for more than a month, it&apos;s
          worth speaking with a healthcare provider.
        </p>
      </div>
    ),
    category: "insomnia",
  },
  {
    question: "Are sleeping pills a good solution for insomnia?",
    answer: (
      <div>
        <p>
          Sleeping medications (both prescription and over-the-counter) may
          provide short-term relief but are generally not recommended as a
          long-term solution for chronic insomnia for several reasons:
        </p>
        <ul className="list-disc pl-5 my-2">
          <li>
            Tolerance: The body often develops tolerance, requiring higher doses
            for the same effect
          </li>
          <li>
            Dependency: Many sleep medications can create physical or
            psychological dependency
          </li>
          <li>
            Side effects: May include daytime drowsiness, cognitive impairment,
            and other adverse effects
          </li>
          <li>
            Masking underlying issues: Medications treat symptoms without
            addressing root causes
          </li>
          <li>
            Rebound insomnia: Sleep often worsens when medications are
            discontinued
          </li>
        </ul>
        <p>
          Major medical organizations now recommend CBT-I as the first-line
          treatment for chronic insomnia, with medication considered only for
          short-term use or specific situations.
        </p>
      </div>
    ),
    category: "insomnia",
  },
  {
    question: "Will my insomnia ever go away?",
    answer: (
      <div>
        <p>
          Yes, insomnia can be effectively treated in most cases. With proper
          treatment:
        </p>
        <ul className="list-disc pl-5 my-2">
          <li>70-80% of people show significant improvement with CBT-I</li>
          <li>
            Many achieve lasting remission when underlying causes and
            perpetuating factors are addressed
          </li>
          <li>
            Even those with long-standing insomnia can see substantial
            improvements
          </li>
        </ul>
        <p>
          Recovery timelines vary. Some people notice improvements within 2-3
          weeks of starting effective treatment, while others may take 8-12
          weeks or longer to see substantial changes. Even in cases where
          complete remission isn&apos;t achieved, most people can experience
          meaningful improvements in sleep quality and duration.
        </p>
      </div>
    ),
    category: "insomnia",
  },

  // CBT-I Questions
  {
    question: "What makes CBT-I different from other insomnia treatments?",
    answer: (
      <div>
        <p>
          CBT-I (Cognitive Behavioral Therapy for Insomnia) differs from other
          approaches in several important ways:
        </p>
        <ul className="list-disc pl-5 my-2">
          <li>Addresses root causes rather than just symptoms</li>
          <li>
            Provides long-lasting results that persist after treatment ends
          </li>
          <li>Has no physical side effects or risk of dependency</li>
          <li>
            Teaches skills that can be used throughout life if sleep problems
            return
          </li>
          <li>
            Based on decades of scientific research with strong evidence for
            effectiveness
          </li>
        </ul>
        <p>
          Unlike sleep medications, which temporarily alter brain chemistry to
          promote sleep, CBT-I works by changing the behaviors, thoughts, and
          conditioned responses that perpetuate insomnia.
        </p>
        <p>
          Learn more about{" "}
          <Link href="/learn/cbt-i" className="text-primary hover:underline">
            how CBT-I works
          </Link>
          .
        </p>
      </div>
    ),
    category: "cbti",
  },
  {
    question: "How long does it take for CBT-I to work?",
    answer: (
      <div>
        <p>CBT-I typically shows progressive improvements over time:</p>
        <ul className="list-disc pl-5 my-2">
          <li>2-4 weeks: Many people begin noticing initial improvements</li>
          <li>
            6-8 weeks: Significant improvements in sleep quality and duration
            are common
          </li>
          <li>
            8-12 weeks: Maximum benefits are often achieved by the end of a
            standard program
          </li>
        </ul>
        <p>
          However, individual responses vary. Some people experience rapid
          improvements, while others take longer. The severity and duration of
          insomnia, presence of comorbid conditions, and consistency in applying
          CBT-I techniques all influence how quickly results appear.
        </p>
        <p>
          It&apos;s important to note that some CBT-I components, particularly
          sleep restriction, may temporarily increase daytime sleepiness before
          improvements occur.
        </p>
      </div>
    ),
    category: "cbti",
  },
  {
    question: "Is sleep restriction therapy safe?",
    answer: (
      <div>
        <p>
          Sleep restriction therapy is generally safe for most individuals when
          properly implemented under guidance, but there are some important
          considerations:
        </p>
        <p className="font-medium">Safety considerations:</p>
        <ul className="list-disc pl-5 my-2">
          <li>Never restrict sleep to less than 5-5.5 hours per night</li>
          <li>Temporary increase in daytime sleepiness is expected</li>
          <li>
            Be cautious with activities requiring alertness (e.g., driving)
            during initial stages
          </li>
        </ul>
        <p className="font-medium">
          Sleep restriction may require adaptation or supervision for people
          with:
        </p>
        <ul className="list-disc pl-5 my-2">
          <li>Seizure disorders</li>
          <li>Bipolar disorder</li>
          <li>Safety-sensitive occupations</li>
          <li>History of sleepwalking or other parasomnias</li>
        </ul>
        <p>
          RealSleep&apos;s program monitors your progress and adjusts sleep
          restriction protocols accordingly. Always consult with a healthcare
          provider before starting sleep restriction if you have medical
          concerns.
        </p>
      </div>
    ),
    category: "cbti",
  },
  {
    question: "Can I use CBT-I if I'm also taking sleep medication?",
    answer: (
      <div>
        <p>
          Yes, CBT-I can be used effectively alongside sleep medication. In
          fact, research suggests combining approaches can be beneficial in some
          cases. Here are some key points:
        </p>
        <ul className="list-disc pl-5 my-2">
          <li>
            Many people successfully transition from medication to CBT-I over
            time
          </li>
          <li>
            CBT-I principles can be applied while gradually reducing medication
            under medical supervision
          </li>
          <li>
            Some studies suggest combined treatment initially may enhance
            outcomes
          </li>
        </ul>
        <p>
          If you&apos;re currently taking sleep medication, do not stop or
          reduce your medication without consulting your healthcare provider.
          They can help you develop a plan that may incorporate CBT-I while
          safely managing any medication changes.
        </p>
      </div>
    ),
    category: "cbti",
  },
  {
    question: "Does CBT-I work for everyone?",
    answer: (
      <div>
        <p>
          While CBT-I is highly effective, with approximately 70-80% of people
          showing significant improvement, it doesn&apos;t work equally well for
          everyone. Factors that may affect outcomes include:
        </p>
        <ul className="list-disc pl-5 my-2">
          <li>
            Presence of untreated medical conditions affecting sleep (e.g.,
            sleep apnea)
          </li>
          <li>Psychiatric conditions that may need concurrent treatment</li>
          <li>Consistency in applying CBT-I techniques</li>
          <li>Environmental factors beyond one&apos;s control</li>
          <li>Individual differences in physiology and psychology</li>
        </ul>
        <p>
          Even among those who don&apos;t achieve complete remission, most
          experience some improvement in sleep quality, duration, or daytime
          functioning. If standard CBT-I doesn&apos;t provide adequate relief,
          working with a sleep specialist can help identify additional
          approaches or modifications.
        </p>
      </div>
    ),
    category: "cbti",
  },

  // RealSleep App Questions
  {
    question: "How does the RealSleep program work?",
    answer: (
      <div>
        <p>
          RealSleep is a 12-week digital CBT-I program that guides you through
          evidence-based techniques to improve your sleep:
        </p>
        <ol className="list-decimal pl-5 my-2">
          <li>
            <span className="font-medium">Assessment:</span> Initial
            questionnaires evaluate your sleep patterns, habits, and challenges
          </li>
          <li>
            <span className="font-medium">Personalization:</span> A customized
            program is created based on your specific needs
          </li>
          <li>
            <span className="font-medium">Daily Tracking:</span> You&apos;ll log
            your sleep using a simple digital sleep diary
          </li>
          <li>
            <span className="font-medium">Weekly Modules:</span> New educational
            content and CBT-I techniques are introduced progressively
          </li>
          <li>
            <span className="font-medium">Interactive Exercises:</span> Guided
            activities help implement cognitive and behavioral techniques
          </li>
          <li>
            <span className="font-medium">Progress Monitoring:</span> Visual
            feedback shows improvements in your sleep metrics
          </li>
          <li>
            <span className="font-medium">Adjustments:</span> Your program
            adapts based on your progress and feedback
          </li>
        </ol>
        <p>
          RealSleep combines all the core components of CBT-I: cognitive
          restructuring, stimulus control, sleep restriction, sleep hygiene
          education, and relaxation training.
        </p>
      </div>
    ),
    category: "app",
  },
  {
    question: "How much time will I need to commit to the program?",
    answer: (
      <div>
        <p>
          RealSleep is designed to fit into busy lifestyles. Time commitments
          include:
        </p>
        <ul className="list-disc pl-5 my-2">
          <li>
            <span className="font-medium">Daily:</span> 2-3 minutes to complete
            your sleep diary
          </li>
          <li>
            <span className="font-medium">Weekly:</span> 15-20 minutes to review
            new educational content and learn techniques
          </li>
          <li>
            <span className="font-medium">Practice:</span> 10-15 minutes for
            relaxation exercises (several times per week)
          </li>
        </ul>
        <p>
          The most significant commitment isn&apos;t time spent in the app, but
          consistently applying the techniques in your daily life, particularly
          following sleep schedule recommendations and stimulus control
          guidelines.
        </p>
        <p>
          The program is self-paced, so you can fit it into your schedule, but
          consistency is key to seeing results.
        </p>
      </div>
    ),
    category: "app",
  },
  {
    question: "Is my data private and secure?",
    answer: (
      <div>
        <p>Yes, RealSleep takes data privacy and security seriously:</p>
        <ul className="list-disc pl-5 my-2">
          <li>All personal data is encrypted both in transit and at rest</li>
          <li>We adhere to HIPAA-aligned security standards</li>
          <li>
            We never sell personally identifiable information to third parties
          </li>
          <li>You can download or delete your data at any time</li>
        </ul>
        <p>
          Your sleep data is only used to personalize your program and generate
          insights about your sleep patterns. Aggregated, anonymized data may be
          used for research to improve the program, but you can opt out of this
          in your{" "}
          <Link
            href="/settings/privacy"
            className="text-primary hover:underline"
          >
            privacy settings
          </Link>
          .
        </p>
      </div>
    ),
    category: "app",
  },
  {
    question: "Can I use RealSleep on multiple devices?",
    answer: (
      <div>
        <p>Yes, RealSleep is designed to work seamlessly across devices:</p>
        <ul className="list-disc pl-5 my-2">
          <li>All progress syncs automatically to your account</li>
          <li>The app works on smartphones, tablets, and desktop browsers</li>
          <li>You can start on one device and continue on another</li>
        </ul>
        <p>
          This flexibility allows you to log your sleep on your phone in the
          morning, complete exercises on your tablet in the evening, and review
          progress reports on your computer whenever convenient.
        </p>
      </div>
    ),
    category: "app",
  },
  {
    question: "What if I miss a day or fall behind?",
    answer: (
      <div>
        <p>
          Life happens, and RealSleep is designed to accommodate occasional
          lapses:
        </p>
        <ul className="list-disc pl-5 my-2">
          <li>
            Missing an occasional sleep log won&apos;t significantly impact your
            progress
          </li>
          <li>
            You can always retroactively add sleep data for the previous day
          </li>
          <li>Weekly modules remain accessible if you need extra time</li>
          <li>The program adapts to your pace, not the other way around</li>
        </ul>
        <p>
          If you fall behind or take a break, simply resume where you left off.
          Consistency is important for results, but perfectionism can be
          counterproductive—especially when it comes to improving sleep!
        </p>
      </div>
    ),
    category: "app",
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<
    "general" | "insomnia" | "cbti" | "app"
  >("general");
  const [expandedQuestions, setExpandedQuestions] = useState<
    Record<string, boolean>
  >({});

  const toggleQuestion = (question: string) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [question]: !prev[question],
    }));
  };

  const filteredFaqs = faqItems.filter(
    (item) => item.category === activeCategory
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Frequently Asked Questions</h1>
      <p className="text-muted-foreground mb-6">
        Find answers to common questions about sleep, insomnia, CBT-I, and using
        the RealSleep app.
      </p>

      {/* Category Tabs */}
      <div className="flex flex-wrap mb-6 border-b border-border">
        <button
          onClick={() => setActiveCategory("general")}
          className={`px-4 py-2 font-medium ${activeCategory === "general" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
        >
          General Sleep
        </button>
        <button
          onClick={() => setActiveCategory("insomnia")}
          className={`px-4 py-2 font-medium ${activeCategory === "insomnia" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
        >
          Insomnia
        </button>
        <button
          onClick={() => setActiveCategory("cbti")}
          className={`px-4 py-2 font-medium ${activeCategory === "cbti" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
        >
          CBT-I
        </button>
        <button
          onClick={() => setActiveCategory("app")}
          className={`px-4 py-2 font-medium ${activeCategory === "app" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
        >
          RealSleep App
        </button>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, index) => (
          <div
            key={index}
            className="border border-border rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleQuestion(faq.question)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-muted/50 transition-colors"
            >
              <h3 className="font-semibold text-lg">{faq.question}</h3>
              {expandedQuestions[faq.question] ? (
                <ChevronUpIcon className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-muted-foreground" />
              )}
            </button>

            {expandedQuestions[faq.question] && (
              <div className="px-6 py-4 bg-card border-t border-border">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-muted rounded-lg">
        <h2 className="text-xl font-bold mb-2">Still have questions?</h2>
        <p className="mb-4">
          If you couldn&apos;t find the answer you were looking for, you can:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>
            <Link href="/learn/cbt-i" className="text-primary hover:underline">
              Learn more about CBT-I basics
            </Link>
          </li>
          <li>
            <Link
              href="/learn/sleep-hygiene"
              className="text-primary hover:underline"
            >
              Review sleep hygiene tips
            </Link>
          </li>
          <li>
            Contact our support team at{" "}
            <span className="font-medium">support@realsleep.app</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
