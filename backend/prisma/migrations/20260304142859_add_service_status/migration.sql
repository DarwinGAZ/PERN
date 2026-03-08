-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "status" "ServiceStatus" NOT NULL DEFAULT 'OPEN';
