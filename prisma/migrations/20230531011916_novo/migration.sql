/*
  Warnings:

  - You are about to drop the column `new` on the `sneaker` table. All the data in the column will be lost.
  - Added the required column `new_sneaker` to the `sneaker` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_sneaker" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "new_sneaker" BOOLEAN NOT NULL,
    "price" REAL NOT NULL,
    "fast_sell" BOOLEAN NOT NULL
);
INSERT INTO "new_sneaker" ("description", "fast_sell", "id", "name", "number", "photo", "price") SELECT "description", "fast_sell", "id", "name", "number", "photo", "price" FROM "sneaker";
DROP TABLE "sneaker";
ALTER TABLE "new_sneaker" RENAME TO "sneaker";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
