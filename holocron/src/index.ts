import 'dotenv/config';

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
import { asyncHandler, authenticate, errorHandler, requireAuth } from './services/http';

if (!process.env.ACCESS_TOKEN_SECRET) {
  throw new Error('ACCESS_TOKEN_SECRET must be set');
}

// Never let a stray rejected promise (Discord, fs, ...) take the whole API down.
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled promise rejection:', reason);
});

const app: express.Application = express();
const port = Number(process.env.PORT) || 8080;
const host = process.env.HOST || '0.0.0.0';

const prisma = new PrismaClient();
const authService = new AuthService();
const discordService = new DiscordService();

const characterContainer = new CharacterContainer(prisma);
const scenarioContainer = new ScenarioContainer(prisma, discordService);
const userContainer = new UserContainer(prisma, authService);

app.disable('x-powered-by');
app.use(express.json({ limit: '5mb' }));
app.use(express.static('public'));

app.get('/', (_req, res) => {
  res.json({ message: 'SWRP api is running' });
});

// log requests
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} - ${req.path}`);
  next();
});

app.use(authenticate(authService));

app.post(
  '/image-crop',
  requireAuth,
  asyncHandler(async (req, res) => {
    const { base64Image, crop, targetWidth, targetHeight } = req.body;
    const file = String(base64Image ?? '')
      .split(';base64,')
      .pop() as string;

    const croppedImage = await cropImage(file, crop, parseInt(targetWidth), parseInt(targetHeight));

    res.json({ croppedImage: `data:image/png;base64,${croppedImage.toString('base64')}` });
  }),
);

app.use('/character', characterContainer.routes);
app.use('/scenario', scenarioContainer.routes);
app.use('/user', userContainer.routes);

app.use((_req, res) => {
  res.status(404).json({ status: 404, message: 'Not found' });
});

// must be registered last
app.use(errorHandler);

function getCredentials() {
  const certDir = process.env.TLS_CERT_DIR || '/etc/letsencrypt/live/recits-perdus.fr';
  return {
    key: fs.readFileSync(`${certDir}/privkey.pem`, 'utf8'),
    cert: fs.readFileSync(`${certDir}/fullchain.pem`, 'utf8'),
  };
}

const server =
  process.env.PROTOCOL === 'https'
    ? https.createServer(getCredentials(), app)
    : http.createServer(app);

server.listen(port, host, () => {
  console.log(`Holocron listening on ${process.env.PROTOCOL || 'http'}://${host}:${port}/`);
});
