import AnimatedHero from './components/AnimatedHero';
import ExperienceTimeline from './components/ExperienceTimeline';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32">
        <AnimatedHero />
      </section>

      {/* Experience Timeline */}
      <ExperienceTimeline />
    </main>
  );
}
