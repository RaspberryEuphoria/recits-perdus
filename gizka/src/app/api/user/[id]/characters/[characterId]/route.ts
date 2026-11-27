import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { httpClient } from '@/services/http-client';

export async function GET(
  request: Request,
  { params: { id, characterId } }: { params: { id: string; characterId: string } },
) {
  const data = await httpClient.get(`/user/${id}/characters/${characterId}`);
  return NextResponse.json(data);
}

export async function PUT(
  request: Request,
  { params: { id, characterId } }: { params: { id: string; characterId: string } },
) {
  const accessToken = cookies().get('userAccessToken')?.value;

  if (!accessToken) {
    return NextResponse.json({ status: 401, message: 'Unauthorized' }, { status: 401 });
  }

  // the API only keeps the editable identity fields
  const body = await request.json();
  const data = await httpClient.put(`/user/${id}/characters/${characterId}`, body, {
    accessToken,
  });
  return NextResponse.json(data);
}
