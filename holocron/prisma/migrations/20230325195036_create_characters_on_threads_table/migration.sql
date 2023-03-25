-- CreateTable
CREATE TABLE "CharactersOnThreads" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "threadId" INTEGER NOT NULL,

    CONSTRAINT "CharactersOnThreads_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CharactersOnThreads" ADD CONSTRAINT "CharactersOnThreads_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharactersOnThreads" ADD CONSTRAINT "CharactersOnThreads_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
