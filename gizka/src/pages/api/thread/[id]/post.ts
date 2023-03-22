import { httpClient } from '@/services/http-client';
import type { NextApiRequest, NextApiResponse } from 'next';

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

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { query, body } = req;
  const threadId = query.id;

  if (req.method === 'POST') {
    const { characterId, content } = body;
    const dialog = await httpClient.post(`/thread/${threadId}/post`, {
      content,
      characterId,
    });

    res.status(200).json(dialog);
  }
}
