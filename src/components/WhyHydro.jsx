"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlertTriangle, Activity, Database } from "lucide-react"; // Icons that match your theme

gsap.registerPlugin(ScrollTrigger);

export default function WhyHydroSyncAI() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".fade-up"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="bg-gradient-to-b from-blue-50 to-white text-black py-20 text-center"
    >
      <h2 className="fade-up text-3xl font-bold">Why HydroSync AI?</h2>
      <p className="fade-up mt-4 max-w-2xl mx-auto text-lg">
        HydroSync AI empowers dam operators with real-time monitoring, predictive alerts, 
        and intelligent insights to ensure safety and optimize water resource management.
      </p>

      {/* Feature section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
        <div className="fade-up flex flex-col items-center">
          <Activity size={48} className="text-blue-600" />
          <h3 className="mt-4 font-semibold text-lg">24/7 Dam Monitoring</h3>
          <p className="mt-2 text-gray-600 text-sm">
            Continuously tracks structural health, water levels, and flow rates in real time.
          </p>
        </div>

        <div className="fade-up flex flex-col items-center">
          <AlertTriangle size={48} className="text-yellow-600" />
          <h3 className="mt-4 font-semibold text-lg">Predictive Alerts</h3>
          <p className="mt-2 text-gray-600 text-sm">
            Detects anomalies early and sends alerts to prevent critical failures.
          </p>
        </div>

        <div className="fade-up flex flex-col items-center">
          <Database size={48} className="text-green-600" />
          <h3 className="mt-4 font-semibold text-lg">Data-Driven Insights</h3>
          <p className="mt-2 text-gray-600 text-sm">
            Uses AI analytics to support decision-making and efficient dam operations.
          </p>
        </div>
      </div>
    </section>
  );
}
