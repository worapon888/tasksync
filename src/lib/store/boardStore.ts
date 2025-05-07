import { create } from "zustand";
import { persist } from "zustand/middleware";

type Task = {
  title: string;
  description: string;
  date: string;
  cover?: string;
};

type BoardState = {
  tasks: Record<string, Task[]>;
  addTask: (columnId: string, task: Task) => void;
  reset: () => void;
};

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      tasks: {
        todo: [],
        doing: [],
        review: [],
        done: [],
      },
      addTask: (columnId, task) =>
        set((state) => ({
          tasks: {
            ...state.tasks,
            [columnId]: [...state.tasks[columnId], task],
          },
        })),
      reset: () =>
        set({
          tasks: {
            todo: [],
            doing: [],
            review: [],
            done: [],
          },
        }),
    }),
    {
      name: "board-storage",
    }
  )
);
