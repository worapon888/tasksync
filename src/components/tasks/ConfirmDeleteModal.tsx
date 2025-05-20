"use client";

import { Dialog } from "@headlessui/react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this Task? This action cannot be undone.",
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        }
      );
    }
  }, [isOpen]);
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel
          ref={panelRef}
          className="bg-white dark:bg-black/60 backdrop-blur-lg rounded-lg p-6 w-full max-w-sm text-center will-change-transform"
        >
          <Dialog.Title className="text-lg font-semibold text-black dark:text-white">
            {title}
          </Dialog.Title>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
            {message}
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <button
              className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-zinc-700 dark:text-white/80 dark:hover:bg-zinc-600 cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 cursor-pointer"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              Delete
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
