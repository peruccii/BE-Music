-- CreateTable
CREATE TABLE "music_favorita" (
    "userId" TEXT NOT NULL,
    "musicId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "musicId"),
    CONSTRAINT "music_favorita_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "music_favorita_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "musics" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
