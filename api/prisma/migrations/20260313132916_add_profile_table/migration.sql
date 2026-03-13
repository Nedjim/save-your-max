/*
  Warnings:

  - A unique constraint covering the columns `[title,profileId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileId` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Category_title_key";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "profileId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "Profile" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_profileId_key" ON "Category"("title", "profileId");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
