import { ChevronDown } from "lucide-react";
import { TaskPriority } from "@/generated/prisma";

interface Props {
  value: TaskPriority;
  onChange: (val: TaskPriority) => void;
}

export default function PrioritySelector({ value, onChange }: Props) {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as TaskPriority)}
        className="appearance-none w-full p-2 pr-10 rounded border bg-transparent text-black dark:bg-slate-600 dark:text-white dark:border-slate-500"
      >
        {Object.values(TaskPriority).map((p) => (
          <option key={p} value={p}>
            {p.charAt(0).toUpperCase() + p.slice(1)} Priority
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white">
        <ChevronDown size={18} />
      </div>
    </div>
  );
}
