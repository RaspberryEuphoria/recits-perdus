import type { NextApiRequest, NextApiResponse } from 'next';

import { httpClient, HttpError } from '@/services/http-client';
import { Post } from '@/utils/types/scenario';

export type DialogAuthor = {
  firstname: string;
  lastname: string;
  fullname: string;
  color: string;
};

export type Dialog = {
  id: number;
  author: DialogAuthor;
  body: string;
};

export type DataDialogs = Array<Dialog>;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Post | HttpError>) {
  const { query, body } = req;
  const scenarioId = query.id;

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ status: 405, message: 'Method not allowed' });
  }

  const accessToken = req.cookies.userAccessToken;
  if (!accessToken) {
    return res.status(401).json({ status: 401, message: 'Unauthorized' });
  }

  const { characterId, content, illustration, action } = body;

  const dialog = await httpClient.post<Post>(
    `/scenario/${scenarioId}/post`,
    { content, characterId, illustration, action },
    { accessToken },
  );

  res.status(200).json(dialog);
}
