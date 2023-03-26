import { PrismaClient, ScenarioStatus } from '@prisma/client';
const prisma = new PrismaClient();

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function main() {
  const usersToCreate = ['rapsody', 'vader', 'kyle', 'revan', 'ego'].map((name) => ({
    name,
    email: `manon.dev.mion+${name}@gmail.com`,
    password: '$2a$08$hYSBggo4M0YF4uxB2pqRQuWReuJUgfWfpJIlw3xUE8faLqqopZKfS',
  }));

  await Promise.all(
    usersToCreate.map(async (user) => {
      const resOne = await fetch(`https://swapi.dev/api/people/${rand(1, 39)}`);
      const randomCharacterOne = await resOne.json();
      const resTwo = await fetch(`https://swapi.dev/api/people/${rand(40, 80)}`);
      const randomCharacterTwo = await resTwo.json();

      const characters = [randomCharacterOne.name, randomCharacterTwo.name].map((name) => ({
        name,
        birthdate: 0,
        story: '',
      }));

      return prisma.user.create({
        data: {
          ...user,
          characters: {
            create: characters,
          },
        },
      });
    }),
  );

  const scenarios = [
    {
      title: 'Le dernier Jedi',
      safeTitle: 'le-dernier-jedi',
      status: ScenarioStatus.IN_PROGRESS,
      era: 'Nouvelle République',
      location: 'Dagobah',
      thumbnail: '',
      introduction: '{{characters}} arrivent dans les marais...',
    },
    {
      title: 'Un assaut désespéré',
      safeTitle: 'un-assaut-desespere',
      status: ScenarioStatus.INITIATED,
      era: 'Nouvelle République',
      location: 'Dantooine',
      thumbnail: '',
      introduction: 'placeholder',
    },
    {
      title: "La chute de l'Empire",
      safeTitle: 'la-chute-de-l-empire',
      status: ScenarioStatus.IN_PROGRESS,
      era: 'Guerre Civile Galactique',
      location: 'Endor',
      thumbnail: '',
      introduction: 'placeholder',
    },
    {
      title: 'Retour parmi les vivants',
      safeTitle: 'retour-parmi-les-vivants',
      status: ScenarioStatus.IN_PROGRESS,
      era: 'Guerre Mandalorienne',
      location: 'Coruscant',
      thumbnail: '',
      introduction: 'placeholder',
    },
    {
      title: 'Rancor et Jawas ne font pas bon ménage !',
      safeTitle: 'rancor-et-jawas-ne-font-pas-bon-menage',
      status: ScenarioStatus.IN_PROGRESS,
      era: 'Guerre Civile Galactique',
      location: 'Tatooine',
      thumbnail: '',
      introduction: 'placeholder',
    },
    {
      title: 'La guerre du Kolto',
      safeTitle: 'la-guerre-du-kolto',
      status: ScenarioStatus.IN_PROGRESS,
      era: 'Guerre Mandalorienne',
      location: 'Manaan',
      thumbnail: '',
      introduction: 'placeholder',
    },
    {
      title: 'Mauvais présage',
      safeTitle: 'mauvais-presage',
      status: ScenarioStatus.IN_PROGRESS,
      era: 'Guerre des Clones',
      location: 'Kashyyyk',
      thumbnail: '',
      introduction: 'placeholder',
    },
    {
      title: 'Arnaque et secrets de famille',
      safeTitle: 'arnaque-et-secrets-de-famille',
      status: ScenarioStatus.IN_PROGRESS,
      era: 'Guerre des Clones',
      location: 'Coruscant',
      thumbnail: '',
      introduction: 'placeholder',
    },
  ];

  await Promise.all(
    scenarios.map(async (scenario) => {
      const characters = await prisma.character.findMany({
        take: rand(2, 4),
        skip: rand(0, 2),
      });

      return prisma.scenario.create({
        data: {
          ...scenario,
          characters: {
            create: characters.map((character) => ({
              characterId: character.id,
            })),
          },
        },
      });
    }),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
