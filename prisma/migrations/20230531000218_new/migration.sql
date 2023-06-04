-- CreateTable
CREATE TABLE "tenis" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "novo" BOOLEAN NOT NULL,
    "preco" REAL NOT NULL,
    "venda_rapida" BOOLEAN NOT NULL,
    "carrinhoId" TEXT,
    "marcaId" TEXT NOT NULL,
    CONSTRAINT "tenis_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "marcas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tenis_carrinhoId_fkey" FOREIGN KEY ("carrinhoId") REFERENCES "carrinho" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "marcas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "carrinho" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "total" REAL NOT NULL,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" DATETIME NOT NULL,
    CONSTRAINT "carrinho_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "compra" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "tenisId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "valor_total" REAL NOT NULL,
    "data_compra" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "compra_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "compra_tenisId_fkey" FOREIGN KEY ("tenisId") REFERENCES "tenis" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "oferta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "tenisId" TEXT NOT NULL,
    "preco_oferta" REAL NOT NULL,
    "data_oferta" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "oferta_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "oferta_tenisId_fkey" FOREIGN KEY ("tenisId") REFERENCES "tenis" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tenis_curtida" (
    "usuarioId" TEXT NOT NULL,
    "tenisId" TEXT NOT NULL,

    PRIMARY KEY ("usuarioId", "tenisId"),
    CONSTRAINT "tenis_curtida_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tenis_curtida_tenisId_fkey" FOREIGN KEY ("tenisId") REFERENCES "tenis" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tenis_favorito" (
    "userId" TEXT NOT NULL,
    "tenisId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "tenisId"),
    CONSTRAINT "tenis_favorito_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tenis_favorito_tenisId_fkey" FOREIGN KEY ("tenisId") REFERENCES "tenis" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "saldo" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_users" ("created_at", "email", "id", "name", "senha", "updated_at") SELECT "created_at", "email", "id", "name", "senha", "updated_at" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
