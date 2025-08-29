"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function TransitionWrapper({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
    return () => {
      gsap.to(ref.current, { opacity: 0, y: -50, duration: 0.5 });
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
