"use client";
import gsap from "gsap";
import { useRouter } from "next/navigation";

export default function AnimatedNavLink({ href, children, className = "" }) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    // create a page-out animation for body, then navigate
    const body = document.querySelector("main") || document.body;
    gsap.to(body, { opacity: 0, y: -20, duration: 0.5, ease: "power2.in", onComplete: () => router.push(href) });
  };

  return (
    <button onClick={handleClick} className={`transition-all ${className}`}>
      {children}
    </button>
  );
}
