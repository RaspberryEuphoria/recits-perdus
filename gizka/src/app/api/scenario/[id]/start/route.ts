import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { httpClient } from '@/services/http-client';
import { Scenario } from '@/utils/types/scenario';

export async function POST(_: Request, { params: { id } }: { params: { id: string } }) {
  const accessToken = cookies().get('userAccessToken')?.value;

  if (!accessToken) {
    return NextResponse.error();
  }

  const data = await httpClient.post<Scenario>(`/scenario/${id}/start`, {}, { accessToken });

  return NextResponse.json(data);
}
