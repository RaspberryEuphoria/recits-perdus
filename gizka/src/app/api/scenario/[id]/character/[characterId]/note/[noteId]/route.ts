import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { httpClient } from '@/services/http-client';
import { Note } from '@/utils/types/scenario';

export async function PATCH(
  request: Request,
  {
    params: { id, characterId, noteId },
  }: { params: { id: string; characterId: string; noteId: string } },
) {
  const accessToken = cookies().get('userAccessToken')?.value;

  if (!accessToken) {
    return NextResponse.error();
  }

  const { category, title, subtitle, description, illustration } = await request.json();

  console.log('Attempt to update note', `/scenario/${id}/character/${characterId}/note/${noteId}`);

  const data = await httpClient.patch<Note>(
    `/scenario/${id}/character/${characterId}/note/${noteId}`,
    {
      category,
      title,
      subtitle,
      description,
      illustration,
    },
    { accessToken },
  );

  return NextResponse.json(data);
}
