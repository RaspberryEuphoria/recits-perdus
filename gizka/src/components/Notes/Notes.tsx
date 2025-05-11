import PencilIcon from '@/public/images/icons/pencil.svg';

import { Button } from '../DesignSystem/Button';
import { Card } from '../DesignSystem/Card';
import { Row } from '../DesignSystem/Row';
import { Text } from '../DesignSystem/Text';
import * as Styled from './styled';

type NotesProps = {};

export function Notes(props: NotesProps) {
  return (
    <Styled.Container>
      <Row gap="1" space="1" justify="end">
        <Button variant="small" outline>
          <PencilIcon /> Ajouter une entrée
        </Button>
      </Row>

      <Row gap="1" space="1">
        <Text as="h2">Personnages</Text>
      </Row>

      <Row display="grid" gap="1" justify="space-between" gridRepeat={4}>
        <Card title="Auren Tanaka" subTitle="Garde du corps du prince d'Ondéron en exil" />
      </Row>

      <Row gap="1" space="1">
        <Text as="h2">Lieux</Text>
      </Row>

      <Row display="grid" gap="1" justify="space-between" gridRepeat={4}>
        <Card title="Les Communs" subTitle="Ghetto sélonien à l'abri des regards indiscrets" />
        <Card title="L'Île du Requin Fixaran" subTitle="Petite île privée" />
      </Row>

      <Row gap="1" space="1">
        <Text as="h2">Objets</Text>
      </Row>

      <Row gap="1" space="1">
        <Text as="h2">Indices</Text>
      </Row>
    </Styled.Container>
  );
}
