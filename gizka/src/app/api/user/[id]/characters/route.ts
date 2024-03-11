import { NextResponse } from 'next/server';

import { httpClient } from '@/services/http-client';

export async function GET(request: Request, { params: { id } }: { params: { id: string } }) {
  const data = await httpClient.get(`/user/${id}/characters`);

  return NextResponse.json(data);
}
