-- CreateTable
CREATE TABLE "ItemData" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "charge" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "itemId" TEXT,

    CONSTRAINT "ItemData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItemData" ADD CONSTRAINT "ItemData_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
