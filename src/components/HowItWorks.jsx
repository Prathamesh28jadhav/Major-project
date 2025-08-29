"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".icon-animate"),
      { opacity: 0, scale: 0.8, y: 50 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        stagger: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="bg-gray-100 py-20">
      <div className="max-w-5xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-12">How Does a Hydroelectric Dam Work?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Reservoir */}
          <div className="icon-animate flex flex-col items-center">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="blue" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
            <h3 className="text-xl font-semibold mt-4">Reservoir</h3>
            <p className="mt-2 text-gray-700 max-w-xs">
              Stores water at height to create potential energy for power generation.
            </p>
          </div>
          {/* Turbine */}
          <div className="icon-animate flex flex-col items-center">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="green" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <h3 className="text-xl font-semibold mt-4">Turbine</h3>
            <p className="mt-2 text-gray-700 max-w-xs">
              Water flow spins turbines to convert potential energy into mechanical energy.
            </p>
          </div>
          {/* Powerhouse */}
          <div className="icon-animate flex flex-col items-center">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="orange" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3h18v18H3z" />
              <path d="M9 21V9h6v12" />
            </svg>
            <h3 className="text-xl font-semibold mt-4">Powerhouse</h3>
            <p className="mt-2 text-gray-700 max-w-xs">
              Mechanical energy drives generators producing clean electrical power.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
