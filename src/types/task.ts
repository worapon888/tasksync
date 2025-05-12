// Task Status และ Priority ที่ใช้ในระบบ
export type TaskStatus = "TODO" | "DOING" | "REVIEW" | "DONE";

export type TasksByColumn = {
  [key in TaskStatus]: Task[];
};

export type TaskPriority = "low" | "medium" | "high";

// Enum สำหรับ TaskMode ที่ตรงกับ Prisma และระบบ
export enum TaskMode {
  PersonalAssistant = "PersonalAssistant",
  CareerTransition = "CareerTransition",
  FinancialPlanner = "FinancialPlanner",
  BusinessLaunchpad = "BusinessLaunchpad",
  SocialGrowth = "SocialGrowth",
  PersonalDevelopment = "PersonalDevelopment",
  HealthJourney = "HealthJourney",
  LeisureBalance = "LeisureBalance",
  MindfulLiving = "MindfulLiving",
}

// ใช้ตอนกรอกใน Modal ยังไม่ต้องมี userId หรือ id
export interface IncomingTask {
  title: string;
  description?: string;
  dueDate?: string;
  cover?: string;
  priority: TaskPriority;
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
