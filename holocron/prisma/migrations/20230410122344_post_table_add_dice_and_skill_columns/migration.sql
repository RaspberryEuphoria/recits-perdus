-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "dice" INTEGER,
ADD COLUMN     "skillId" INTEGER;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;
