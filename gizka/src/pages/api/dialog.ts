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
  content: string;
};

export type DataDialogs = Array<Dialog>;

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  // get scenarioId from url
  // const scenarioId = req.query.id;
  // if (req.method === 'POST') {
  //   const dialog = await httpClient.post(`http://localhost:8080/scenario/${scenarioId}/post`);
  //   res.status(204).json(dialog);
  // }
  // res.status(200).json([]);
}
