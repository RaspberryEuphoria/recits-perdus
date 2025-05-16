import { Character, Scenario } from '@prisma/client';
import { Client, GatewayIntentBits, hyperlink, TextChannel, WebhookClient } from 'discord.js';

import { MoveId } from '../app/scenario/domain/post/entities/move';
import { t } from '../locales/translate';

const useDiscord = process.env.DISCORD_ENABLED === 'true';

const discordWebhookClient = new WebhookClient({
  id: `${process.env.DISCORD_HOLONET_WEBHOOK_ID}`,
  token: `${process.env.DISCORD_HOLONET_WEBHOOK_TOKEN}`,
});

const discordClient = new Client({ intents: [GatewayIntentBits.GuildMessages] });
if (useDiscord) {
  discordClient.login(process.env.DISCORD_HOLONET_APP_TOKEN);
}

const mockDiscordWebhookClient = {
  send: (message: string) => {
    console.log(message);
  },
} as WebhookClient;

const mockDiscordClient = {
  channels: {
    cache: {
      get: (id: string) => ({
        id,
        send: (message: string) => {
          console.log(message);
        },
      }),
    },
  },
} as Client;

export class DiscordService {
  private webhookClient = useDiscord ? discordWebhookClient : mockDiscordWebhookClient;
  private client = useDiscord ? discordClient : mockDiscordClient;

  public async createScenario({
    scenario,
    character,
  }: {
    scenario: Scenario;
    character: Character;
  }) {
    const channel = (await this.client.channels.fetch(
      `${process.env.DISCORD_HOLONET_CHANNEL_ID}`,
    )) as TextChannel;

    const message = await channel.send({
      content: `**${character.firstName} ${character.lastName}** ${t(
        'scenarios:created',
      )} "${hyperlink(
        scenario.title,
        `http://recits-perdus.fr/scenarios/en-attente/${scenario.id}-${scenario.safeTitle}`,
      )}" (${t('scenarios:era')} "${scenario.era}", ${t('scenarios:location')} "${
        scenario.location
      }") !`,
    });

    await message.startThread({
      name: scenario.title,
    });

    return message;
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

    this.webhookClient.send({
      content: `**${characters[0].firstName} ${characters[0].lastName}** ${t(
        'scenarios:started',
      )} "${hyperlink(
        scenario.title,
        `http://recits-perdus.fr/scenarios/en-cours/${scenario.id}-${scenario.safeTitle}`,
      )}" ! ${t('scenarios:good-luck')} ${charactersNames} !`,
      ...(scenario.threadId ? { threadId: scenario.threadId } : {}),
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

    this.webhookClient.send({
      content: `**${character.firstName} ${character.lastName}** ${playedWording} ${t(
        'scenarios:in',
      )} "*${hyperlink(
        scenario.title,
        `http://recits-perdus.fr/scenarios/en-cours/${scenario.id}-${scenario.safeTitle}#message-${postId}`,
      )}*" !`,
      ...(scenario.threadId ? { threadId: scenario.threadId } : {}),
    });
  }
}
