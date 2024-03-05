-- CreateEnum
CREATE TYPE "MoveResult" AS ENUM ('SUCCESS', 'MIXED', 'FAILURE');

-- CreateTable
CREATE TABLE "MoveOnPosts" (
    "id" SERIAL NOT NULL,
    "moveId" TEXT NOT NULL,
    "moveResullt" "MoveResult" NOT NULL,
    "isResolved" BOOLEAN NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "MoveOnPosts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MoveOnPosts_postId_key" ON "MoveOnPosts"("postId");

-- AddForeignKey
ALTER TABLE "MoveOnPosts" ADD CONSTRAINT "MoveOnPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
