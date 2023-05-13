/*
  Warnings:

  - You are about to drop the `music_rent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "music_rent";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "music_curtida" (
    "userId" TEXT NOT NULL,
    "musicId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "musicId"),
    CONSTRAINT "music_curtida_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "music_curtida_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "musics" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
