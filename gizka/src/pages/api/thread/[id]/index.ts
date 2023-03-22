import { httpClient } from '@/services/http-client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const id = req.query.id;

  if (req.method === 'POST') {
    res.status(204);
  }

  if (req.method === 'GET') {
    const thread = await httpClient.get(`/thread/${id}`);
    res.status(200).json(thread);
  }
}
