-- CreateTable
CREATE TABLE "admin" (
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "warehouses" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "session" (
    "key" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "expiredAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("key")
);
