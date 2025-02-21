import AnimatedHero from './components/AnimatedHero';
import ExperienceTimeline from './components/ExperienceTimeline';
import ParticleBackground from './components/ParticleBackground';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 relative">
      <div className="absolute inset-0 overflow-hidden">
        <ParticleBackground />
      </div>
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-20 pb-16">
          <AnimatedHero />
        </section>

        {/* Experience Timeline */}
        <ExperienceTimeline />
      </div>
    </main>
  );
}
