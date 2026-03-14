export const revalidate = 0;

import { cookies } from 'next/dist/client/components/headers';
import { NextResponse } from 'next/server';

import { httpClient } from '@/services/http-client';
import { Note } from '@/utils/types/scenario';

export async function GET(_: Request, { params: { id } }: { params: { id: string } }) {
  const accessToken = cookies().get('userAccessToken')?.value;

  if (!accessToken) {
    return NextResponse.error();
  }

  const data = await httpClient.get<Note>(`/character/${id}/notes`);

  return NextResponse.json(data);
}
