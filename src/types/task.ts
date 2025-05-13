import { TaskPriority, TaskMode } from "@/generated/prisma";

// Task Status และ Priority ที่ใช้ในระบบ
export type TaskStatus = "TODO" | "DOING" | "REVIEW" | "DONE";

export type TasksByColumn = {
  [key in TaskStatus]: Task[];
};

// Enum สำหรับ TaskMode ที่ตรงกับ Prisma และระบบ

// ใช้ตอนกรอกใน Modal ยังไม่ต้องมี userId หรือ id
export interface IncomingTask {
  title: string;
  description?: string;
  dueDate?: string;
  cover?: string;
  priority: TaskPriority;
  mode: TaskMode;
}

// Task ที่ได้จากฐานข้อมูล
export interface Task {
  id: string;
  title: string;
  description: string | null;
  dueDate: Date | null;
  cover: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  userId: string;
  mode: TaskMode;
  createdAt: Date;
  updatedAt: Date;
}

export type ModePercentage = {
  mode: string;
  progress: number;
};

// แยกประเภท task สำหรับใช้ในหน้า board (drag & drop ได้ในอนาคต)
export type ColumnType = "todo" | "doing" | "review" | "done";

// สำหรับ Modal (ยังเปิดใช้ต่อได้)
export interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type RawTask = {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  cover?: string;
  userId: string;
  mode: TaskMode;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  updatedAt: string;
};

export type GroupedStatus = {
  total: number;
  toDo: number;
  inProgress: number;
  review: number;
  done: number;
};

export interface DashboardData {
  grouped: GroupedStatus;
  byDay: number[]; // 7 วันในสัปดาห์ (จันทร์–อาทิตย์)
  focusTasks: Task[]; // ใช้ type Task ที่คุณมีอยู่แล้ว
  modePercentages: ModePercentage[]; // มีแล้วในไฟล์
  tasks: Task[];
}
