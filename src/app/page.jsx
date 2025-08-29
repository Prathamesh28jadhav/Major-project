import HeroSection from "@/components/HeroSection";
import WhyHydro from "@/components/WhyHydro";
import HowItWorks from "@/components/HowItWorks";
import { AlertTriangle } from "lucide-react"; // nice icon

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="absolute top-0 w-full flex justify-between items-center px-8 py-4 text-white z-10">
        <h2 className="text-2xl font-bold">HydroSync AI</h2>
        <div className="flex gap-4">
          <a href="/login" className="hover:underline">Login</a>
          <a href="/register" className="hover:underline">Register</a>
        </div>
      </nav>

      {/* Hero section */}
      <HeroSection />

      {/* Why Hydro section */}
      <WhyHydro />

      {/* How it works section with animated diagrams */}
      <HowItWorks />

     
    </main>
  );
}
