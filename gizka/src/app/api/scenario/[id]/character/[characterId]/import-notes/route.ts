import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { httpClient } from '@/services/http-client';
import { Note } from '@/utils/types/scenario';

export async function POST(
  request: Request,
  { params: { id, characterId } }: { params: { id: string; characterId: string } },
) {
  const accessToken = cookies().get('userAccessToken')?.value;

  if (!accessToken) {
    return NextResponse.error();
  }

  const { notesIds } = await request.json();

  const data = await httpClient.post<Note>(
    `/scenario/${id}/character/${characterId}/import-notes`,
    {
      notesIds,
    },
    { accessToken },
  );

  return NextResponse.json(data);
}
