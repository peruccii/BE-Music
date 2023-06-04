/*
  Warnings:

  - You are about to drop the `carrinho` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `compra` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `oferta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tenis` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `tenis_curtida` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `usuarioId` on the `tenis_curtida` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `marcas` table. All the data in the column will be lost.
  - Added the required column `userId` to the `tenis_curtida` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `marcas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `marcas` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "carrinho";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "compra";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "oferta";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "tenis";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "sneaker" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "new" BOOLEAN NOT NULL,
    "price" REAL NOT NULL,
    "fast_sell" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "tenis_marca" (
    "tenisId" TEXT NOT NULL,
    "marcaId" TEXT NOT NULL,

    PRIMARY KEY ("tenisId", "marcaId"),
    CONSTRAINT "tenis_marca_tenisId_fkey" FOREIGN KEY ("tenisId") REFERENCES "sneaker" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tenis_marca_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "marcas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Carrinho" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tenis_carrinho" (
    "tenisId" TEXT NOT NULL,
    "carrinhoId" TEXT NOT NULL,

    PRIMARY KEY ("tenisId", "carrinhoId"),
    CONSTRAINT "tenis_carrinho_tenisId_fkey" FOREIGN KEY ("tenisId") REFERENCES "sneaker" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tenis_carrinho_carrinhoId_fkey" FOREIGN KEY ("carrinhoId") REFERENCES "Carrinho" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tenis_curtida" (
    "userId" TEXT NOT NULL,
    "tenisId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "tenisId"),
    CONSTRAINT "tenis_curtida_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tenis_curtida_tenisId_fkey" FOREIGN KEY ("tenisId") REFERENCES "sneaker" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tenis_curtida" ("tenisId") SELECT "tenisId" FROM "tenis_curtida";
DROP TABLE "tenis_curtida";
ALTER TABLE "new_tenis_curtida" RENAME TO "tenis_curtida";
CREATE TABLE "new_tenis_favorito" (
    "userId" TEXT NOT NULL,
    "tenisId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "tenisId"),
    CONSTRAINT "tenis_favorito_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tenis_favorito_tenisId_fkey" FOREIGN KEY ("tenisId") REFERENCES "sneaker" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tenis_favorito" ("tenisId", "userId") SELECT "tenisId", "userId" FROM "tenis_favorito";
DROP TABLE "tenis_favorito";
ALTER TABLE "new_tenis_favorito" RENAME TO "tenis_favorito";
CREATE TABLE "new_marcas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL
);
INSERT INTO "new_marcas" ("id") SELECT "id" FROM "marcas";
DROP TABLE "marcas";
ALTER TABLE "new_marcas" RENAME TO "marcas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
