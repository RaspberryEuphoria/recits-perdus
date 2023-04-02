import { httpClient } from '@/services/http-client';
import { Scenario } from '@/utils/types/scenario';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const id = req.query.id;

  if (req.method === 'OPTIONS') {
    return res.status(200).send('ok');
  }

  if (req.method === 'POST') {
    res.status(204);
  }

  if (req.method === 'GET') {
    const scenario = await httpClient.get<Scenario>(`/scenario/${id}`);
    res.status(200).json(scenario);
  }
}
