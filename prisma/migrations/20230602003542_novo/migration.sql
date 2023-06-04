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
    "fast_sell" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_sneaker" ("description", "fast_sell", "id", "name", "new_sneaker", "number", "photo", "price") SELECT "description", "fast_sell", "id", "name", "new_sneaker", "number", "photo", "price" FROM "sneaker";
DROP TABLE "sneaker";
ALTER TABLE "new_sneaker" RENAME TO "sneaker";
CREATE UNIQUE INDEX "sneaker_name_key" ON "sneaker"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
