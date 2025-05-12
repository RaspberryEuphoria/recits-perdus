-- CreateEnum
CREATE TYPE "NoteCategory" AS ENUM ('CHARACTER', 'LOCATION', 'ITEM', 'CLUE');

-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "scenarioId" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "subtitle" VARCHAR(255),
    "description" TEXT,
    "category" "NoteCategory" NOT NULL,
    "illustration" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_scenarioId_fkey" FOREIGN KEY ("scenarioId") REFERENCES "Scenario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
