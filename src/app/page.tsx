import AnimatedHero from './components/AnimatedHero';
import ExperienceTimeline from './components/ExperienceTimeline';
import { Particles } from "@/components/ui/particles";
import Sidebar from './components/Sidebar';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 relative">
      <div className="absolute inset-0 overflow-hidden">
        <Particles
          className="pointer-events-none"
          quantity={120}
          staticity={20}
          ease={40}
          size={1.2}
          color="#E5E7EB"
        />
      </div>
      
      <div className="relative z-10 flex">
        <Sidebar />
        
        <div className="flex-1 md:ml-72">
          {/* Main Content */}
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            {/* Hero Section */}
            <section className="pt-20 pb-16">
              <AnimatedHero />
            </section>

            {/* Experience Timeline */}
            <ExperienceTimeline />
          </div>
        </div>
      </div>
    </main>
  );
}
