import { Character, Scenario } from '@prisma/client';
import { hyperlink, WebhookClient } from 'discord.js';

import { MoveId } from '../app/scenario/domain/post/entities/move';
import { t } from '../locales/translate';

const discordWebhookClient = new WebhookClient({
  id: `${process.env.DISCORD_HOLONET_CHANNEL_ID}`,
  token: `${process.env.DISCORD_HOLONET_CHANNEL_TOKEN}`,
});

const mockDiscordWebhookClient = {
  send: (message: string) => {
    console.log(message);
  },
} as WebhookClient;

const useDiscord = process.env.DISCORD_ENABLED === 'true';

export class DiscordService {
  private client = useDiscord ? discordWebhookClient : mockDiscordWebhookClient;

  public createScenario({ scenario, character }: { scenario: Scenario; character: Character }) {
    this.client.send({
      content: `**${character.firstName} ${character.lastName}** ${t(
        'scenarios:created',
      )} "${hyperlink(
        scenario.title,
        `http://recits-perdus.fr/scenarios/en-attente/${scenario.id}-${scenario.safeTitle}`,
      )}" (${t('scenarios:era')} "${scenario.era}", ${t('scenarios:location')} "${
        scenario.location
      }") !`,
    });
  }

  public startedScenario({
    scenario,
    characters,
  }: {
    scenario: Scenario;
    characters: Array<Character>;
  }) {
    const formatter = new Intl.ListFormat('fr-Fr', { style: 'long', type: 'conjunction' });
    const charactersNames = formatter.format(
      characters.map((character) => `**${character.firstName} ${character.lastName}**`),
    );

    this.client.send({
      content: `**${characters[0].firstName} ${characters[0].lastName}** ${t(
        'scenarios:started',
      )} "${hyperlink(
        scenario.title,
        `http://recits-perdus.fr/scenarios/en-cours/${scenario.id}-${scenario.safeTitle}`,
      )}" ! ${t('scenarios:good-luck')} ${charactersNames} !`,
    });
  }

  public postInScenario({
    character,
    scenario,
    postId,
    moveId,
  }: {
    character: Character;
    scenario: Scenario;
    postId: number;
    moveId?: MoveId;
  }) {
    const playedWording = moveId ? t(`moves:${moveId}`) : t('scenarios:played');

    this.client.send({
      content: `**${character.firstName} ${character.lastName}** ${playedWording} ${t(
        'scenarios:in',
      )} "*${hyperlink(
        scenario.title,
        `http://recits-perdus.fr/scenarios/en-cours/${scenario.id}-${scenario.safeTitle}#message-${postId}`,
      )}*" !`,
    });
  }
}
