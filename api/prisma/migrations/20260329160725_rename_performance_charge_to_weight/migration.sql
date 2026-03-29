/*
  Warnings:

  - You are about to drop the column `charge` on the `Performance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Performance" DROP COLUMN "charge",
ADD COLUMN     "weight" INTEGER NOT NULL DEFAULT 0;
