import { PrismaClient } from '@prisma/client';
import express from 'express';
import fs from 'fs';
import http from 'http';
import https from 'https';

import { ScenarioContainer } from './app/scenario/scenario.container';
import { UserContainer } from './app/user/user.container';
import { AuthService } from './services/AuthService';
import { DiscordService } from './services/DiscordService';

const app: express.Application = express();
const port = 8080;

const prisma = new PrismaClient();
const authService = new AuthService();
const discordService = new DiscordService();

function getCredentials() {
  const privateKey = fs.readFileSync('/etc/letsencrypt/live/recits-perdus.fr/privkey.pem', 'utf8');
  const certificate = fs.readFileSync(
    '/etc/letsencrypt/live/recits-perdus.fr/fullchain.pem',
    'utf8',
  );

  return { key: privateKey, cert: certificate };
}

const server =
  process.env.PROTOCOL === 'https'
    ? https.createServer(getCredentials(), app)
    : http.createServer(app);

server.listen(port, () => {
  console.log(`TypeScript with Express http://localhost:${port}/`);

  const scenarioContainer = new ScenarioContainer(prisma, discordService);
  const userContainer = new UserContainer(prisma, authService);

  app.use('/scenario', scenarioContainer.routes);
  app.use('/user', userContainer.routes);
});

app.use(express.json({ limit: '5mb' }));
app.use(express.static('public'));

app.get('/', (_req, res) => {
  res.json({
    message: 'TypeScript With Express',
  });
});

// log requests
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((req: express.Request, _res: express.Response, next: express.NextFunction) => {
  console.log(
    `${new Date().toLocaleDateString('en-En', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    })} - ${req.method} - ${req.url}`,
  );

  next();
});

// handle app errors
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, _req: express.Request, _res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    _res.status(500).send('Something broke!');
  },
);
