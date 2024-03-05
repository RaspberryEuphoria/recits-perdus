/*
  Warnings:

  - Added the required column `meta` to the `MovesOnPosts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MovesOnPosts" ADD COLUMN     "meta" JSONB NOT NULL;
