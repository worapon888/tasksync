import { useState } from "react";

export default function useDragTaskConfirmDelete(fetchTasks: () => void) {
  const [taskId, setTaskId] = useState<string | null>(null);

  const modal = taskId && {
    isOpen: true,
    onClose: () => setTaskId(null),
    onConfirm: async () => {
      try {
        await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
        fetchTasks();
      } catch (err) {
        console.error("❌ Delete failed:", err);
      } finally {
        setTaskId(null);
      }
    },
  };

  return { setTaskId, modal };
}
