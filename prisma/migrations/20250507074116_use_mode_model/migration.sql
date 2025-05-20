-- CreateEnum
CREATE TYPE "TaskMode" AS ENUM ('PersonalAssistant', 'CareerTransition', 'FinancialPlanner', 'BusinessLaunchpad', 'SocialGrowth', 'PersonalDevelopment', 'HealthJourney', 'LeisureBalance', 'MindfulLiving');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "mode" "TaskMode" NOT NULL DEFAULT 'PersonalAssistant';
