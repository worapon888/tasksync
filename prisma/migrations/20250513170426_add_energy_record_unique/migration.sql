/*
  Warnings:

  - A unique constraint covering the columns `[userId,day,month,year]` on the table `EnergyRecord` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EnergyRecord_userId_day_month_year_key" ON "EnergyRecord"("userId", "day", "month", "year");
