// components/tasks/ConfirmDeleteModal.tsx
"use client";

import { Dialog } from "@headlessui/react";

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="bg-white dark:bg-black/60 backdrop-blur-lg rounded-lg p-6 w-full max-w-sm text-center">
          <Dialog.Title className="text-lg font-semibold text-black dark:text-white">
            Confirm Delete
          </Dialog.Title>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
            Are you sure you want to delete this task? This action cannot be
            undone.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <button
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 cursor-pointer"
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
