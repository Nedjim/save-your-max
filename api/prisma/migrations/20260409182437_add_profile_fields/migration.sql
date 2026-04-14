/*
  Warnings:

  - The primary key for the `Exercise` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Performance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[pseudo]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `id` on the `Exercise` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Performance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `exerciseId` on the `Performance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `birthday` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Performance" DROP CONSTRAINT "Performance_exerciseId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Performance" DROP CONSTRAINT "Performance_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ALTER COLUMN "reps" DROP NOT NULL,
ALTER COLUMN "reps" DROP DEFAULT,
DROP COLUMN "exerciseId",
ADD COLUMN     "exerciseId" UUID NOT NULL,
ALTER COLUMN "weight" DROP NOT NULL,
ALTER COLUMN "weight" DROP DEFAULT,
ADD CONSTRAINT "Performance_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "pseudo" TEXT,
ADD COLUMN     "surname" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "Profile_id_key" CASCADE;

-- CreateIndex
CREATE INDEX "Exercise_profileId_idx" ON "Exercise"("profileId");

-- CreateIndex
CREATE INDEX "Performance_exerciseId_idx" ON "Performance"("exerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_pseudo_key" ON "Profile"("pseudo");

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
