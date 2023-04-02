import type { NextApiRequest, NextApiResponse } from 'next';

import { httpClient, HttpError } from '@/services/http-client';
import { Scenario } from '@/utils/types/scenario';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Scenario | HttpError>,
) {
  const id = req.query.id;

  if (req.method === 'OPTIONS') {
    return res.status(200);
  }

  if (req.method === 'POST') {
    res.status(204);
  }

  if (req.method === 'GET') {
    const scenario = await httpClient.get<Scenario>(`/scenario/${id}`);
    res.status(200).json(scenario);
  }
}
