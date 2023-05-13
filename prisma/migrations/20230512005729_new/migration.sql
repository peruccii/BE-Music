-- CreateTable
CREATE TABLE "music_playlist" (
    "playlistId" TEXT NOT NULL,
    "musicId" TEXT NOT NULL,

    PRIMARY KEY ("musicId", "playlistId"),
    CONSTRAINT "music_playlist_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "music_playlist_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "musics" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
