-- CreateTable
CREATE TABLE "sizes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sizes" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tenis_size" (
    "tenisId" TEXT NOT NULL,
    "sizeId" TEXT NOT NULL,

    PRIMARY KEY ("tenisId", "sizeId"),
    CONSTRAINT "tenis_size_tenisId_fkey" FOREIGN KEY ("tenisId") REFERENCES "sneaker" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tenis_size_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "sizes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
