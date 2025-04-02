// app/page.tsx
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="container flex items-center justify-between py-6">
        <div className="text-2xl font-bold text-primary">SleepWell</div>
        <div className="flex items-center gap-6">
          <Link
            href="/about"
            className="text-foreground hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            href="/features"
            className="text-foreground hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Better Sleep Through <span className="text-primary">CBT-I</span>
            </h1>
            <p className="text-lg mb-8 text-muted-foreground">
              A 12-week program based on Cognitive Behavioral Therapy for
              Insomnia, designed to help you establish healthy sleep patterns
              naturally.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors text-center flex items-center justify-center gap-2"
              >
                Get Started <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link
                href="/learn-more"
                className="px-6 py-3 border border-input rounded-md text-foreground hover:bg-muted transition-colors text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="bg-muted rounded-lg p-8">
            {/* Placeholder for sleep tracker preview */}
            <div className="aspect-video bg-card rounded-md shadow-sm p-4">
              <div className="text-center text-muted-foreground">
                Sleep Tracker Preview
              </div>
              <div className="mt-4 h-40 bg-muted-foreground/10 rounded-md"></div>
              <div className="mt-4 h-6 w-3/4 bg-muted-foreground/10 rounded-md"></div>
              <div className="mt-2 h-6 w-1/2 bg-muted-foreground/10 rounded-md"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Sleep Diary",
                description:
                  "Track your sleep patterns, including bedtime, wake-up time, and sleep quality.",
              },
              {
                title: "CBT Techniques",
                description:
                  "Learn cognitive techniques to identify and challenge negative thoughts about sleep.",
              },
              {
                title: "Sleep Restriction",
                description:
                  "Improve sleep efficiency by optimizing your time in bed.",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Improve Your Sleep?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join our 12-week program and get personalized recommendations based on
          your sleep patterns and progress.
        </p>
        <Link
          href="/signup"
          className="px-8 py-4 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors inline-flex items-center gap-2"
        >
          Start Your Journey <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-muted border-t border-input py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-bold text-primary mb-4 md:mb-0">
              SleepWell
            </div>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} SleepWell. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
