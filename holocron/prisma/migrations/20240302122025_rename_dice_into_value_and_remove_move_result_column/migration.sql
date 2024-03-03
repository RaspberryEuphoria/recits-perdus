/*
  Warnings:

  - You are about to drop the column `dice` on the `DicesOnPosts` table. All the data in the column will be lost.
  - You are about to drop the column `moveResult` on the `Post` table. All the data in the column will be lost.
  - Added the required column `value` to the `DicesOnPosts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DicesOnPosts" DROP COLUMN "dice",
ADD COLUMN     "value" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "moveResult";
