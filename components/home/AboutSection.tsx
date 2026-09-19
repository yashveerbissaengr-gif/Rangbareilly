"use client";

import React from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { Heading, Text } from "../ui/Typography";

export function AboutSection() {
  return (
    <section className="w-full bg-[#F5F2EA] py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-24">
        
        {/* Top Header */}
        <div className="w-full flex flex-col items-center text-center max-w-3xl mx-auto">
          <Text className="text-xs uppercase tracking-[0.3em] text-[#2B2622]/60 mb-4 font-bold">
            Our Story
          </Text>
          <Heading as="h2" className="text-4xl md:text-5xl lg:text-6xl text-[#2B2622] mb-6 leading-[1.1]">
            Small Sparks. Everyday.
          </Heading>
          <Text className="text-[#2B2622]/80 text-lg">
            RANGBAREILLY was founded on a simple premise: fine jewelry shouldn&apos;t be reserved for special occasions. It should be lived in, loved, and worn every single day.
          </Text>
        </div>

        {/* Feature 1 */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-1/2">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-sm"
            >
              <Image
                src="/images/core-hero-bg-v4.jpg"
                alt="Minimalist gold jewelry"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </m.div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col">
            <m.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <Text className="text-xs uppercase tracking-widest text-[#2B2622]/60 mb-4 font-bold">
                Our Philosophy
              </Text>
              <Heading as="h3" className="text-3xl lg:text-4xl text-[#2B2622] mb-6">
                Designed for the Quiet Moments
              </Heading>
              <Text className="text-[#2B2622]/80 leading-relaxed mb-6">
                We believe that true luxury whispers. It doesn&apos;t shout. Our pieces are characterized by clean lines, negative space, and an uncompromising dedication to structural integrity.
              </Text>
              <Text className="text-[#2B2622]/80 leading-relaxed">
                Every piece of RANGBAREILLY jewelry is handcrafted using responsibly sourced 14k solid gold and conflict-free diamonds. We design with longevity in mind, ensuring your pieces will outlast fleeting trends and become part of your daily uniform.
              </Text>
            </m.div>
          </div>
        </div>

        {/* Feature 2 (Reversed) */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-1/2">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-sm"
            >
              <Image
                src="/images/loud-hero-bg-v4.jpg"
                alt="Statement jewelry pieces"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </m.div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col">
            <m.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <Text className="text-xs uppercase tracking-widest text-[#2B2622]/60 mb-4 font-bold">
                Our Craft
              </Text>
              <Heading as="h3" className="text-3xl lg:text-4xl text-[#2B2622] mb-6">
                Ethically Sourced. Masterfully Made.
              </Heading>
              <Text className="text-[#2B2622]/80 leading-relaxed mb-6">
                We partner exclusively with certified facilities that prioritize fair wages, safe working conditions, and sustainable practices. Because beautiful things shouldn&apos;t come at an ugly cost.
              </Text>
              <Text className="text-[#2B2622]/80 leading-relaxed">
                From the drawing board to the final polish, our artisans pour decades of expertise into every curve and setting, guaranteeing a finish that catches the light from every angle.
              </Text>
            </m.div>
          </div>
        </div>

      </div>
    </section>
  );
}
