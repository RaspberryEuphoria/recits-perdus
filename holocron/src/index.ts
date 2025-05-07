import { PrismaClient } from '@prisma/client';
import express from 'express';
import fs from 'fs';
import http from 'http';
import https from 'https';

import { CharacterContainer } from './app/character/character.container';
import { ScenarioContainer } from './app/scenario/scenario.container';
import { UserContainer } from './app/user/user.container';
import { AuthService } from './services/AuthService';
import { cropImage } from './services/Cropper';
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

  const characterContainer = new CharacterContainer(prisma);
  const scenarioContainer = new ScenarioContainer(prisma, discordService);
  const userContainer = new UserContainer(prisma, authService);

  app.use('/character', characterContainer.routes);
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
app.use(async (req: express.Request, _res: express.Response, next: express.NextFunction) => {
  if (req.url.startsWith('/images')) {
    next();
    return;
  }

  console.log(
    `${new Date().toLocaleDateString('en-En', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    })} - ${req.method} - ${req.url}`,
  );

  const { accesstoken } = req.headers;
  if (!accesstoken) {
    next();
    return;
  }

  const user = await authService.getUserByAccessToken(accesstoken as string);
  if (user) {
    req.loggedUser = user;
  }

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

app.post('/image-crop', async (req, res, next) => {
  try {
    const { base64Image, crop, targetWidth, targetHeight } = req.body;
    const file = base64Image.split(';base64,').pop();

    const croppedImage = await cropImage(file, crop, parseInt(targetWidth), parseInt(targetHeight));

    res.json({ croppedImage: `data:image/png;base64,${croppedImage.toString('base64')}` });
  } catch (error) {
    next(error);
  }
});
