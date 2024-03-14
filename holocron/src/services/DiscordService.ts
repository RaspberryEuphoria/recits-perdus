import { Character, Scenario } from '@prisma/client';
import { hyperlink, WebhookClient } from 'discord.js';

import { Moves } from '../app/scenario/domain/post/entities/post';
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

  public send({
    character,
    scenario,
    postId,
    moveId,
  }: {
    character: Character;
    scenario: Scenario;
    postId: number;
    moveId?: Moves;
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
