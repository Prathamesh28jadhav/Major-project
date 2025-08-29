"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: -50 }, 
      { opacity: 1, y: 0, duration: 1, delay: 0.5 }
    );
    gsap.fromTo(subtitleRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, delay: 1 }
    );
    gsap.fromTo(ctaRef.current, 
      { opacity: 0, scale: 0.8 }, 
      { opacity: 1, scale: 1, duration: 1, delay: 1.5 }
    );
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center text-center text-white overflow-hidden">
      {/* Background video */}
      <video 
        autoPlay 
        loop 
        muted 
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/dam-bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-[-1]" />

      {/* Content */}
      <div className="space-y-6">
        <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold">
          Future of HydroSync AI
        </h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl">
          Clean Energy • Sustainable Development • Innovation
        </p>
        <div ref={ctaRef} className="flex gap-4 justify-center">
          <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
          <Button variant="outline" className="text-black border-white hover:bg-white/10">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
