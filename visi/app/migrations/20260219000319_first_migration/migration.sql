-- AlterTable
ALTER TABLE "User" ADD COLUMN     "approvalStatus" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "isInstitutionalEmail" BOOLEAN NOT NULL DEFAULT false;
