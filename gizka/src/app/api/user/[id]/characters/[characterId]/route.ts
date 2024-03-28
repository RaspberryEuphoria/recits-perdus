import { NextResponse } from 'next/server';

import { httpClient } from '@/services/http-client';

export async function GET(
  request: Request,
  { params: { id, characterId } }: { params: { id: string; characterId: string } },
) {
  const data = await httpClient.get(`/user/${id}/characters/${characterId}`);
  return NextResponse.json(data);
}
