// hooks/useIsDragging.ts
import { useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";

export default function useIsDragging() {
  const [isDragging, setIsDragging] = useState(false);

  useDndMonitor({
    onDragStart: () => setIsDragging(true),
    onDragEnd: () => setIsDragging(false),
    onDragCancel: () => setIsDragging(false),
  });

  return isDragging;
}
