import { Metadata } from 'next';

import { PartenaireWithIdPage } from '@/components/Pages/PartenaireWithIdPage';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Partenaires - The Last Stand',
    description: `Il y a bien longtemps, dans une galaxie lointaine, très lointaine…

Mille cinq cents années se sont écoulées depuis la victoire de l'Alliance Rebelle sur l'Empire Galactique lors de la bataille de Yavin. Si la galaxie a connu depuis bien des conflits, elle s’entre-déchire aujourd'hui depuis plusieurs siècles entre trois superpuissances s'affrontant pour le contrôle total de la galaxie, sans que l'une d'entre elles ne soit capable de prendre le dessus.

L'Empire Galactique, malgré ses revers, existe toujours. Bien qu'il ait fini par renier l'héritage des Sith, il recherche toujours à faire triompher l'Ordre Nouveau, l'idée d'un pouvoir fort et incarné par la figure de l'Empereur de la Dynastie Fel, face au péril des Seigneurs Sith ainsi que le Chaos représenté par la République Galactique.

Cette dernière, qu'il avait jadis supplanté, est revenue suite à l'échec de l'Alliance Galactique qui l'avait remplacée. Elle est le dernier régime défendant la liberté et la démocratie dans la Galaxie et fait face à ses adversaires grâce au soutien de l'Ordre Jedi, mais également à sa Grande Armée composée de clones de nouveau formés sur Kamino afin de pouvoir s'opposer aux invasions du Consortium Éternel, mais aussi aux prétentions territoriales de l'Empire Galactique.

Au nord, un nouveau mal a pris racine, corrompant la cour de la Reine-Mère du Consortium de Hapès. S'associant avec les Sith, la lignée Hapienne a forgé le Consortium Éternel et a répandu ses forces afin de pouvoir consolider sa position. Si le Consortium fait face à une résistance acharnée, il compte sur la puissance du Côté Obscur et le soutien des Sith afin de pouvoir remporter la victoire finale et placer la galaxie entière sous le règne de sa divinité.

Mais certains refusent de s'engager dans le conflit : les forces de l'Apex ont supplanté les grandes organisations criminelles et ne recherchent rien d'autre qu'assurer leur survie dans un univers hostile. Les Mandaloriens n'ont pas choisi leur camp et pour l'instant travaillent comme des mercenaires pour les trois grands régimes galactiques. Toutefois, le conflit se radicalise chaque jour et il est évident que sa conclusion changera durablement le visage de la galaxie. A vous de venir forger son destin !`,
  };
}

export default async function TheLastStand() {
  return (
    <PartenaireWithIdPage name="Star Wars : The Last Stand">
      <iframe
        id="tls"
        src="https://swtls.forumactif.com/h2-fiche-de-pub"
        style={{
          width: '100%',
          height: '1200px',
          border: 'none',
          overflow: 'hidden',
        }}
      ></iframe>
    </PartenaireWithIdPage>
  );
}
