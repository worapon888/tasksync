// context/DragDropContext.tsx
"use client";

import {
  DndContext as DndKitContext,
  closestCenter,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { createContext, useContext, useState } from "react";

// -----------------------
// 🧠 ประเภทข้อมูลใน Context
// -----------------------
type DragContextType = {
  activeTaskId: string | null;
};

// -----------------------
// 🧱 สร้าง Context
// -----------------------
const DragContext = createContext<DragContextType | undefined>(undefined);

// -----------------------
// 🧲 Hook สำหรับใช้ในลูก component
// -----------------------
export function useDragContext() {
  const context = useContext(DragContext);
  if (!context) {
    throw new Error("useDragContext must be used within DragDropProvider");
  }
  return context;
}

// -----------------------
// 🚀 Provider ที่ห่อ DndKitContext และเผยแพร่ context
// -----------------------
type DragDropProviderProps = {
  children: React.ReactNode;
  onDragEnd: (event: DragEndEvent) => void;
};

export function DragDropProvider({
  children,
  onDragEnd,
}: DragDropProviderProps) {
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const id = event.active.id;
    if (typeof id === "string") {
      setActiveTaskId(id);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTaskId(null); // clear state
    onDragEnd(event); // ส่ง event ไปให้ component ภายนอกจัดการ
  };

  return (
    <DragContext.Provider value={{ activeTaskId }}>
      <DndKitContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {children}
      </DndKitContext>
    </DragContext.Provider>
  );
}
