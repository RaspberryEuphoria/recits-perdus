import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import { WebhookClient } from 'discord.js';
import express from 'express';

import { ScenarioContainer } from './app/scenario/scenario.container';
import { UserContainer } from './app/user/user.container';
import { AuthService } from './services/AuthService';

const app: express.Application = express();
const port = 8080;

const prisma = new PrismaClient();
const authService = new AuthService();

const discordWebhookClient = new WebhookClient({
  id: `${process.env.DISCORD_HOLONET_CHANNEL_ID}`,
  token: `${process.env.DISCORD_HOLONET_CHANNEL_TOKEN}`,
});

const mockDiscordWebhookClient = {
  send: (message: string) => {
    console.log(message);
  },
} as WebhookClient;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (_req, _res) => {
  _res.json({
    message: 'TypeScript With Express',
  });
});

app.listen(port, () => {
  console.log(`TypeScript with Express http://localhost:${port}/`);

  const scenarioContainer = new ScenarioContainer(
    prisma,
    process.env.DISCORD_ENABLED ? discordWebhookClient : mockDiscordWebhookClient,
  );
  const userContainer = new UserContainer(prisma, authService);

  app.use('/scenario', scenarioContainer.routes);
  app.use('/user', userContainer.routes);
});

// handle app errors
app.use(
  (err: Error, _req: express.Request, _res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    _res.status(500).send('Something broke!');
  },
);
