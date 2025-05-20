"use client";
import useIsDragging from "@/hooks/useIsDragging";
import EditZone from "./EditZone";
import DeleteZone from "./DeleteZone";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function FloatingZones() {
  const isDragging = useIsDragging();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDragging && containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 10, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        }
      );
    }
  }, [isDragging]);

  if (!isDragging) return null;

  return (
    <div ref={containerRef}>
      <EditZone />
      <DeleteZone />
    </div>
  );
}
