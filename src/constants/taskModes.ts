export const TaskModes = {
  PersonalAssistant: "Personal Assistant",
  CareerTransition: "Career Transition",
  FinancialPlanner: "Financial Planner",
  BusinessLaunchpad: "Business Launchpad",
  SocialGrowth: "Social Growth",
  PersonalDevelopment: "Personal Development",
  HealthJourney: "Health Journey",
  LeisureBalance: "Leisure & Balance",
  MindfulLiving: "Mindful Living",
} as const;

export type TaskModeEnum = keyof typeof TaskModes;
