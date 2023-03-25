-- CreateTable
CREATE TABLE "CharactersOnScenarios" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "scenarioId" INTEGER NOT NULL,

    CONSTRAINT "CharactersOnScenarios_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CharactersOnScenarios" ADD CONSTRAINT "CharactersOnScenarios_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharactersOnScenarios" ADD CONSTRAINT "CharactersOnScenarios_scenarioId_fkey" FOREIGN KEY ("scenarioId") REFERENCES "Scenario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
