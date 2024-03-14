import type { NextApiRequest, NextApiResponse } from 'next';

import { httpClient, HttpError } from '@/services/http-client';
import { Post } from '@/utils/types/scenario';

import { Dialog } from '..';

export type DataDialogs = Array<Dialog>;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Post | HttpError>) {
  const { query, body } = req;
  const scenarioId = query.id;
  const postId = query.postId;

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method === 'PUT') {
    const { content } = body;

    const dialog = await httpClient.put<Post>(`/scenario/${scenarioId}/post/${postId}`, {
      content,
    });

    res.status(200).json(dialog);
  }
}
