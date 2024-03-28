import { PrismaClient, ScenarioStatus } from '@prisma/client';

import { TextColor } from '../src/constants';

const prisma = new PrismaClient();

type SwApiCharacter = {
  name: string;
};

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function main() {
  const skills = [
    {
      name: 'Finesse',
      description: 'Rapidité, agilité, et capacité en combat à distance',
    },
    {
      name: 'Détermination',
      description: 'Courage, volonté, empathie, sociabilité et loyauté',
    },
    {
      name: 'Ténacité',
      description: 'Force physique, endurance, agressivité, et capacité en combat au corps à corps',
    },
    {
      name: 'Subterfuge',
      description: 'Sournoiserie, tromperie et ruse',
    },
    {
      name: 'Intuition',
      description: 'Expertise, connaissances, et perception',
    },
  ];

  await Promise.all(
    skills.map(async (skill) => {
      return prisma.skill.create({
        data: skill,
      });
    }),
  );

  const usersToCreate = ['rapsody', 'vader', 'kyle', 'revan', 'ego'].map((name) => ({
    name,
    email: `manon.dev.mion+${name}@gmail.com`,
    password: '$2a$08$sRg1QXyZV4FFesS14SrG8uA/gF6jcYlezZGB1sbqOrbRFaqGwZrkG', // password
  }));

  await Promise.all(
    usersToCreate.map(async (user, index) => {
      // swapi API starts at index 1
      const apiIndex = index + index + 1;
      // const resOne = await fetch(`https://swapi.dev/api/people/${apiIndex}`);
      // const randomCharacterOne = (await resOne.json()) as SwApiCharacter;
      // const resTwo = await fetch(`https://swapi.dev/api/people/${apiIndex + 1}`);
      // const randomCharacterTwo = (await resTwo.json()) as SwApiCharacter;

      const characters = [`${user.name}_one`, `${user.name}_two`].map((name) => {
        const characterSkills = skills.map((skill, i) => ({
          skillId: i + 1,
          level: rand(1, 5),
        }));

        const [firstName, ...lastName] = name.split(' ');
        return {
          firstName,
          lastName: lastName.join(' '),
          age: 0,
          story: '',
          avatar: `avatar-${firstName}.jpg`,
          skills: {
            create: characterSkills,
          },
        };
      });

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
      introduction:
        'La quête de {{characters}} les amène sur Dagobah, où ils vont devoir affronter leur part de côté obscur...',
    },
    {
      title: 'Un assaut désespéré',
      safeTitle: 'un-assaut-desespere',
      status: ScenarioStatus.INITIATED,
      era: 'Nouvelle République',
      location: 'Dantooine',
      thumbnail: '',
      introduction:
        '{{characters}} se retrouvent sur Dantooine, où is seront la dernière ligne de défense contre les forces de l’Empire...',
    },
    {
      title: "La chute de l'Empire",
      safeTitle: 'la-chute-de-l-empire',
      status: ScenarioStatus.IN_PROGRESS,
      era: 'Guerre Civile Galactique',
      location: 'Endor',
      thumbnail: '',
      introduction:
        'Contre toute attente, les forces de l’Empire ont réussi à s’emparer de la base rebelle d’Endor. Il revient à {{characters}} de les arrêter !',
    },
    {
      title: 'Retour parmi les vivants',
      safeTitle: 'retour-parmi-les-vivants',
      status: ScenarioStatus.IN_PROGRESS,
      era: 'Guerre Mandalorienne',
      location: 'Coruscant',
      thumbnail: '',
      introduction:
        "Alors qu'on les pensait morts, {{characters}} sont de retour sur la capitale de la République. Mais ils ne sont pas les seuls...",
    },
    {
      title: 'Rancor et Jawas ne font pas bon ménage !',
      safeTitle: 'rancor-et-jawas-ne-font-pas-bon-menage',
      status: ScenarioStatus.IN_PROGRESS,
      era: 'Guerre Civile Galactique',
      location: 'Tatooine',
      thumbnail: '',
      introduction:
        '{{characters}} se retrouvent sur Tatooine, dans le palais de Jabba le Hutt. Mais ils ne sont pas les seuls à vouloir s’emparer de la précieuse cargaison de Jabba...',
    },
    {
      title: 'La guerre du Kolto',
      safeTitle: 'la-guerre-du-kolto',
      status: ScenarioStatus.IN_PROGRESS,
      era: 'Guerre Mandalorienne',
      location: 'Manaan',
      thumbnail: '',
      introduction:
        "La guerre fait rage partout dans la galaxie, mais pas sur Manaan. Pourtant, {{characters}} vont devoir s’y rendre. C'est ici et nulle part ailleurs que se trouve le précieux Kolto...",
    },
    {
      title: 'Mauvais présage',
      safeTitle: 'mauvais-presage',
      status: ScenarioStatus.IN_PROGRESS,
      era: 'Guerre des Clones',
      location: 'Kashyyyk',
      thumbnail: '',
      introduction:
        '{{characters}} se retrouvent sur Kashyyyk, où ils vont devoir affronter les forces de l’Empire...',
    },
    {
      title: 'Arnaque et secrets de famille',
      safeTitle: 'arnaque-et-secrets-de-famille',
      status: ScenarioStatus.IN_PROGRESS,
      era: 'Guerre des Clones',
      location: 'Coruscant',
      thumbnail: '',
      introduction:
        '{{characters}} sont de retour sur Coruscant, pour un dîner en famille. Bien sûr, rien ne se passe comme prévu...',
    },
  ];

  const colors = Object.values(TextColor);

  await Promise.all(
    scenarios.map(async (scenario) => {
      const users = await prisma.user.findMany();
      users.sort(() => Math.random() - 0.5);
      users.splice(rand(2, 4));

      const characters = await Promise.all(
        users.map(async (user) => {
          const characters = await prisma.character.findMany({
            where: {
              userId: user.id,
            },
          });

          characters.sort(() => Math.random() - 0.5);

          return characters[0];
        }),
      );

      colors.sort(() => Math.random() - 0.5);

      return prisma.scenario.create({
        data: {
          ...scenario,
          characters: {
            create: characters.map((character, index) => ({
              textColor: colors[index],
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
