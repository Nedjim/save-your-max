/*
  Warnings:

  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ItemData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ItemData" DROP CONSTRAINT "ItemData_itemId_fkey";

-- DropTable
DROP TABLE "Item";

-- DropTable
DROP TABLE "ItemData";
