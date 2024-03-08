import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import express from 'express';

import { ScenarioContainer } from './app/scenario/scenario.container';
import { UserContainer } from './app/user/user.container';
import { AuthService } from './services/AuthService';

const app: express.Application = express();
const port = 8080;

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
});

const authService = new AuthService();

app.use(bodyParser.json());

app.get('/', (_req, _res) => {
  _res.json({
    message: 'TypeScript With Express',
  });
});

app.listen(port, () => {
  console.log(`TypeScript with Express http://localhost:${port}/`);

  const scenarioContainer = new ScenarioContainer(prisma);
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
