/*
  Warnings:

  - A unique constraint covering the columns `[ipAddress,port]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ipAddressWithPort" ON "Client"("ipAddress", "port");
