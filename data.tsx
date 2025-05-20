import {
  Briefcase,
  ArrowRightLeft,
  WalletMinimal,
  Rocket,
  Handshake,
  Brain,
  BicepsFlexed,
  Leaf,
  HeartPlus,
} from "lucide-react";

export const features = [
  {
    title: "Personal Assistant",
    subtitle: "Get things done, beautifully.",
    icon: Briefcase, // ✅ เปลี่ยนจาก <Briefcase /> เป็น Briefcase
    color: "from-red-500/20 to-red-900/20",
    border: "border-red-500/40",
    glow: "shadow-[0_0_40px_rgba(255,50,50,0.3)]",
  },
  {
    title: "Career Transition",
    subtitle: "Redefine your future.",
    icon: ArrowRightLeft,
  },
  {
    title: "Financial Planner",
    subtitle: "Build wealth, step by step.",
    icon: WalletMinimal,
  },
  {
    title: "Business Launchpad",
    subtitle: "From idea to reality",
    icon: Rocket,
  },
  {
    title: "Social Growth",
    subtitle: "Connect deeper, live better.",
    icon: Handshake,
  },
  {
    title: "PersonalDevelopment",
    subtitle: "Evolve beyond limits.",
    icon: Brain,
    color: "from-blue-500/20 to-blue-900/20",
    border: "border-blue-500/40",
    glow: "shadow-[0_0_40px_rgba(100,100,255,0.3)]",
  },
  {
    title: "Health Journey",
    subtitle: "Strong body, clear mind.",
    icon: BicepsFlexed,
  },
  {
    title: "Leisure & Balance",
    subtitle: "Recharge and bloom.",
    icon: Leaf,
    color: "from-green-500/20 to-green-900/20",
    border: "border-green-500/40",
    glow: "shadow-[0_0_40px_rgba(0,200,100,0.3)]",
  },
  {
    title: "Mindful Living",
    subtitle: "Peace within, strength without.",
    icon: HeartPlus,
  },
];

export const days = [
  { name: "Sun", date: 21, energyLevel: "Low Energy", value: 20 },
  { name: "Mon", date: 22, energyLevel: "High Energy", value: 80 },
  { name: "Tue", date: 23, energyLevel: "Medium Energy", value: 50 },
  { name: "Wed", date: 24, energyLevel: "Low Energy", value: 30 },
  { name: "Thu", date: 25, energyLevel: "High Energy", value: 90 },
  { name: "Fri", date: 26, energyLevel: "Medium Energy", value: 60 },
  { name: "Sat", date: 27, energyLevel: "Low Energy", value: 10 },
];

export const mockTasks = {
  todo: [
    {
      title: "Make a new post",
      date: "21/06/2025",
      description: "Lorem ipsum is simply dummy text of the printing...",
      cover: "/board/board_img1.avif",
    },
    {
      title: "Make a prototype website",
      date: "25/06/2025",
      description: "Lorem ipsum is simply dummy text...",
    },
  ],
  doing: [
    {
      title: "Check design materials",
      date: "21/06/2025",
      description: "Lorem ipsum is simply dummy text of the printing...",
      cover:
        "https://images.unsplash.com/photo-1649371176738-dfc088e7a037?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ],
  review: [
    {
      title: "Discuss year budgets",
      date: "05/12/2024",
      description: "Lorem ipsum is simply dummy text...",
    },
    {
      title: "Content plans",
      date: "21/06/2025",
      description: "Lorem ipsum is simply dummy text...",
      cover: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    },
  ],
  done: [
    {
      title: "Weekly planning meeting",
      date: "05/12/2024",
      description: "Lorem ipsum is simply dummy text...",
    },
    {
      title: "Discuss a new concept",
      date: "05/12/2024",
      description: "Lorem ipsum is simply dummy text...",
    },
    {
      title: "Discuss monthly budgets",
      date: "05/12/2024",
      description: "Lorem ipsum is simply dummy text...",
    },
  ],
};

export const hours = [
  "6 AM",
  "7 AM",
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 AM",
  "1 PM",
  "2 PM",
  // "3 PM",
  // "4 PM",
  // "5 PM",
  // "6 PM",
  // "7 PM",
  // "8 PM",
  // "9 PM",
  // "10 PM",
  // "11 PM",
  // "12 PM",
  // "1 PM",
  // "2 PM",
  // "3 PM",
  // "4 PM",
  // "5 PM",
];

export const columns = [
  { id: "todo", title: "To do", color: "bg-pink-500" },
  { id: "doing", title: "Doing", color: "bg-orange-400" },
  { id: "review", title: "Under Review", color: "bg-cyan-400" },
  { id: "done", title: "Done", color: "bg-green-400" },
];
