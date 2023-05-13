/*
  Warnings:

  - Added the required column `url_music` to the `musics` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_musics" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "cantor" TEXT NOT NULL,
    "url_music" TEXT NOT NULL,
    "realease_date" DATETIME NOT NULL
);
INSERT INTO "new_musics" ("cantor", "id", "photo", "realease_date", "title") SELECT "cantor", "id", "photo", "realease_date", "title" FROM "musics";
DROP TABLE "musics";
ALTER TABLE "new_musics" RENAME TO "musics";
CREATE UNIQUE INDEX "musics_title_key" ON "musics"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
