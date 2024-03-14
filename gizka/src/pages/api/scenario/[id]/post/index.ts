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

  if (req.method === 'POST') {
    const { characterId, content, action } = body;
    const dialog = await httpClient.post<Post>(`/scenario/${scenarioId}/post`, {
      content,
      characterId,
      action,
    });

    res.status(200).json(dialog);
  }
}
