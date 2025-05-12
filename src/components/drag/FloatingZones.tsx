"use client";
import useIsDragging from "@/hooks/useIsDragging";
import EditZone from "./EditZone";
import DeleteZone from "./DeleteZone";

export default function FloatingZones() {
  const isDragging = useIsDragging();
  if (!isDragging) return null;

  return (
    <>
      <EditZone />
      <DeleteZone />
    </>
  );
}
