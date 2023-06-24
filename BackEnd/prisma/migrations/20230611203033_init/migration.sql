-- CreateTable
CREATE TABLE "veiculo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "nomeDoVeiculo" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "DescVeiculo" TEXT NOT NULL,
    CONSTRAINT "veiculo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "veiculo_placa_key" ON "veiculo"("placa");
