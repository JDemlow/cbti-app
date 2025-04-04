// app/(app)/learn/cbt-i/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CBT-I Basics | RealSleep",
  description:
    "Learn about Cognitive Behavioral Therapy for Insomnia (CBT-I) and how it can help improve your sleep",
};

export default function CBTIPage() {
  return (
    <div className="prose max-w-none">
      <h1 className="mb-6">
        Cognitive Behavioral Therapy for Insomnia (CBT-I)
      </h1>

      <div className="bg-muted p-4 rounded-md mb-6">
        <p className="font-medium">
          CBT-I is considered the first-line treatment for chronic insomnia by
          the American Academy of Sleep Medicine and the American College of
          Physicians.
        </p>
      </div>

      <h2>What is CBT-I?</h2>
      <p>
        Cognitive Behavioral Therapy for Insomnia (CBT-I) is a structured
        program that helps identify and replace thoughts and behaviors that
        cause or worsen sleep problems with habits that promote sound sleep.
        Unlike sleeping pills, CBT-I addresses the underlying causes of insomnia
        rather than just treating symptoms.
      </p>

      <p>
        Research has shown that CBT-I is highly effective, with approximately
        70-80% of patients showing significant improvement. The best part is
        that these improvements are typically long-lasting, whereas the effects
        of sleep medication often diminish over time.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className="bg-card border border-border rounded-md p-4">
          <h3 className="text-lg font-bold mb-2">Core Components of CBT-I</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Cognitive therapy</li>
            <li>Stimulus control</li>
            <li>Sleep restriction</li>
            <li>Sleep hygiene education</li>
            <li>Relaxation training</li>
          </ul>
        </div>

        <div className="bg-card border border-border rounded-md p-4">
          <h3 className="text-lg font-bold mb-2">Benefits of CBT-I</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>No medication side effects</li>
            <li>Long-lasting results</li>
            <li>Improves both sleep quality and quantity</li>
            <li>Can be combined with other treatments</li>
            <li>Addresses underlying causes</li>
          </ul>
        </div>
      </div>

      <h2>The Five Main Components of CBT-I</h2>

      <h3>1. Cognitive Restructuring</h3>
      <p>
        This component focuses on identifying, challenging, and changing beliefs
        and thoughts that impact your sleep. Many people with insomnia develop
        negative thoughts and worries around sleep, such as &quot;I&apos;ll
        never fall asleep&quot; or &quot;I&apos;ll be useless tomorrow if I
        don&apos;t sleep well tonight.&quot; These thoughts create anxiety that
        makes it harder to fall asleep.
      </p>
      <p>
        Cognitive restructuring helps you recognize these unhelpful thought
        patterns and replace them with more balanced, realistic thinking.
      </p>

      <h3>2. Stimulus Control</h3>
      <p>
        Stimulus control aims to strengthen the association between the
        bed/bedroom and sleep. People with insomnia often come to associate
        their bed with wakefulness and frustration rather than sleep. Stimulus
        control includes practices like:
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li>Only going to bed when sleepy</li>
        <li>
          Using the bed only for sleep and sex (not for reading, watching TV,
          etc.)
        </li>
        <li>Getting out of bed when unable to sleep after 15-20 minutes</li>
        <li>Returning to bed only when sleepy again</li>
        <li>
          Maintaining a consistent wake-up time regardless of sleep duration
        </li>
      </ul>

      <h3>3. Sleep Restriction</h3>
      <p>
        Sleep restriction involves temporarily limiting the time spent in bed to
        match your actual sleep time, which helps consolidate sleep and reduce
        the time it takes to fall asleep. As sleep efficiency improves, the time
        in bed is gradually increased.
      </p>
      <p>
        For example, if you typically spend 8 hours in bed but only sleep for 6
        hours, your initial &quot;sleep window&quot; might be restricted to 6
        hours. This creates mild sleep deprivation that helps you fall asleep
        faster and stay asleep longer.
      </p>

      <h3>4. Sleep Hygiene Education</h3>
      <p>
        Sleep hygiene involves adopting habits and creating an environment that
        promotes better sleep, including:
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li>Maintaining a regular sleep schedule</li>
        <li>Creating a comfortable sleep environment (dark, quiet, cool)</li>
        <li>Avoiding stimulants like caffeine and nicotine near bedtime</li>
        <li>Limiting daytime napping</li>
        <li>Regular exercise (though not too close to bedtime)</li>
        <li>Managing digital device use before bed</li>
      </ul>

      <h3>5. Relaxation Training</h3>
      <p>
        Relaxation techniques help reduce physical and mental tension that can
        interfere with sleep. These may include:
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li>Progressive muscle relaxation</li>
        <li>Deep breathing exercises</li>
        <li>Mindfulness meditation</li>
        <li>Guided imagery</li>
        <li>Autogenic training</li>
      </ul>

      <h2>How RealSleep Uses CBT-I</h2>
      <p>
        The RealSleep program incorporates all five components of CBT-I in a
        structured 12-week program:
      </p>
      <ul className="list-disc pl-5 mb-6">
        <li>Daily sleep tracking to monitor progress</li>
        <li>
          Weekly educational modules focusing on different CBT-I components
        </li>
        <li>Interactive exercises for cognitive restructuring</li>
        <li>Personalized sleep window recommendations</li>
        <li>Guided relaxation recordings</li>
        <li>Regular progress assessments</li>
      </ul>

      <h2>Is CBT-I Right for Everyone?</h2>
      <p>
        CBT-I is effective for most people with chronic insomnia, including
        those with co-occurring conditions like depression, anxiety, or chronic
        pain. It can be used as a standalone treatment or in combination with
        medication.
      </p>
      <p>
        However, CBT-I requires commitment and active participation. It&apos;s
        not a quick fix, and some components (especially sleep restriction) can
        temporarily increase daytime sleepiness before improvements occur.
      </p>
      <p>
        If you have another sleep disorder like sleep apnea or restless leg
        syndrome, these conditions should be treated first or alongside CBT-I.
      </p>

      <div className="bg-primary/10 border border-primary/20 rounded-md p-4 my-6">
        <h3 className="text-primary font-bold mb-2">
          Ready to Start Your CBT-I Journey?
        </h3>
        <p className="mb-2">
          RealSleep&apos;s program makes it easy to implement CBT-I techniques
          with guided exercises, sleep tracking, and personalized
          recommendations.
        </p>
        <Link
          href="/dashboard"
          className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors mt-2"
        >
          Begin Your Sleep Improvement
        </Link>
      </div>

      <h2>Further Reading</h2>
      <ul className="list-disc pl-5">
        <li>
          <a
            href="https://www.sleepfoundation.org/insomnia/treatment/cognitive-behavioral-therapy-insomnia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            National Sleep Foundation: CBT-I
          </a>
        </li>
        <li>
          <a
            href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3699411/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Cognitive Behavioral Therapy for Chronic Insomnia: A Systematic
            Review and Meta-analysis
          </a>
        </li>
        <li>
          <Link
            href="/learn/sleep-hygiene"
            className="text-primary hover:underline"
          >
            Sleep Hygiene Tips
          </Link>
        </li>
      </ul>
    </div>
  );
}
