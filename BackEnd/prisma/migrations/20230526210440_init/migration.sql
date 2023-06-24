-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "ra" INTEGER NOT NULL,
    "senha" TEXT NOT NULL,
    "confirmarSenha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "carona" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "end_origem" TEXT NOT NULL,
    "hr_saida" DATETIME NOT NULL,
    "hr_chegada" DATETIME NOT NULL,
    "met_pagamento" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "avaliacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "ST_avaliacao" REAL NOT NULL,
    CONSTRAINT "avaliacao_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_ra_key" ON "users"("ra");
