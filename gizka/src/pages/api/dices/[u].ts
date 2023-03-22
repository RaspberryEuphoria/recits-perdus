import type { NextApiRequest, NextApiResponse } from 'next';

export type DialogAuthor = {
  firstname: string;
  lastname: string;
  fullname: string;
  color: string;
};

export type Dice = {
  value: number;
};

export type DataDices = Array<Dice>;

const dices: Record<string, DataDices> = { lzk: [], plw: [] };

Object.entries(dices).forEach(([key, value]) => {
  for (let i = 0; i < 5; i++) {
    dices[key].push({ value: getRandomNumber(1, 6) });
  }
});

export default function handler(req: NextApiRequest, res: NextApiResponse<DataDices>) {
  const { u: user } = req.query;

  if (req.method === 'POST') {
    res.status(204);
  }

  res.status(200).json(dices[user as keyof typeof dices]);
}

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
