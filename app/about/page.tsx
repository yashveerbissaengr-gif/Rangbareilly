import { Metadata } from 'next';
import { Heading, Text } from '@/components/ui/Typography';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Our Story | Rangbareilly',
  description: 'The story behind Rangbareilly.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F5F2EA]">
      {/* Hero Section */}
      <div className="w-full flex flex-col items-center text-center px-6 py-32 border-b border-rangbareilly-dark/10 mt-16">
        <Heading as="h1" className="text-4xl md:text-5xl lg:text-6xl text-rangbareilly-dark mb-6">
          Small Sparks. Everyday.
        </Heading>
        <Text className="max-w-2xl text-rangbareilly-dark/80 text-lg">
          Rangbareilly was founded on a simple premise: fine jewelry shouldn&apos;t be reserved for special occasions. It should be lived in, loved, and worn every single day.
        </Text>
      </div>

      {/* Content Section */}
      <div className="w-full max-w-[1200px] mx-auto px-6 py-24 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        <div className="w-full lg:w-1/2">
          <div className="relative aspect-[3/4] w-full bg-black/5">
            {/* Using a placeholder gradient for the editorial image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-rangbareilly-dark/20 to-rangbareilly-background/50" />
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 flex flex-col">
          <Text className="text-xs uppercase tracking-widest text-rangbareilly-dark/60 mb-4">
            Our Philosophy
          </Text>
          <Heading as="h2" className="text-3xl text-rangbareilly-dark mb-6">
            Designed for the Quiet Moments
          </Heading>
          <Text className="text-rangbareilly-dark/80 leading-relaxed mb-6">
            We believe that true luxury whispers. It doesn&apos;t shout. Our pieces are characterized by clean lines, negative space, and an uncompromising dedication to structural integrity.
          </Text>
          <Text className="text-rangbareilly-dark/80 leading-relaxed">
            Every piece of Rangbareilly jewelry is handcrafted. We design with longevity in mind, ensuring your pieces will outlast fleeting trends and become part of your daily uniform.
          </Text>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
