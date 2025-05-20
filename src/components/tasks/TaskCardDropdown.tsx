// components/tasks/TaskCardDropdown.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function TaskCardDropdown({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -10, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        }
      );
    }
  }, [open]);

  return (
    <div className="relative">
      <BsThreeDotsVertical
        onClick={() => setOpen((prev) => !prev)}
        className="dark:text-white/80 text-slate-500 text-lg cursor-pointer"
      />
      {open && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-28 bg-white dark:bg-zinc-800 shadow-lg rounded-md text-sm z-50 overflow-hidden"
        >
          <button
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
            className="w-full text-left px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-500 dark:hover:bg-red-800 dark:text-red-400"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
