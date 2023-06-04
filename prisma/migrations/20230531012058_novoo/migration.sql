/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Carrinho` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `sneaker` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Carrinho_nome_key" ON "Carrinho"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "sneaker_name_key" ON "sneaker"("name");
