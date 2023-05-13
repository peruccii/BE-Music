-- CreateTable
CREATE TABLE "Playlist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "playlist_user" (
    "userId" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "playlistId"),
    CONSTRAINT "playlist_user_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "playlist_user_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Playlist_title_key" ON "Playlist"("title");
