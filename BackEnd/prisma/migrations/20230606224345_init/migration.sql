/*
  Warnings:

  - You are about to drop the column `ra` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `sobrenome` on the `users` table. All the data in the column will be lost.
  - Added the required column `ST_carona` to the `carona` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userIdCarona` to the `carona` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "hist_caronas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "caronasPegas" INTEGER NOT NULL,
    "caronasFornecidas" INTEGER NOT NULL,
    CONSTRAINT "hist_caronas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_carona" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userIdCarona" INTEGER NOT NULL,
    "end_origem" TEXT NOT NULL,
    "hr_saida" DATETIME NOT NULL,
    "hr_chegada" DATETIME NOT NULL,
    "met_pagamento" TEXT NOT NULL,
    "ST_carona" TEXT NOT NULL,
    CONSTRAINT "carona_userIdCarona_fkey" FOREIGN KEY ("userIdCarona") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_carona" ("end_origem", "hr_chegada", "hr_saida", "id", "met_pagamento") SELECT "end_origem", "hr_chegada", "hr_saida", "id", "met_pagamento" FROM "carona";
DROP TABLE "carona";
ALTER TABLE "new_carona" RENAME TO "carona";
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "confirmarSenha" TEXT NOT NULL
);
INSERT INTO "new_users" ("confirmarSenha", "id", "nome", "senha", "telefone") SELECT "confirmarSenha", "id", "nome", "senha", "telefone" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
