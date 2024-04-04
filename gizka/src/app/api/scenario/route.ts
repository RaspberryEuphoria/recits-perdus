import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { httpClient } from '@/services/http-client';
import { Scenario } from '@/utils/types/scenario';

export async function POST(request: Request) {
  const accessToken = cookies().get('userAccessToken')?.value;

  if (!accessToken) {
    return NextResponse.error();
  }

  const { title, era, introduction, characterId, textColor, location } = await request.json();

  const data = await httpClient.post<Scenario>(
    '/scenario',
    {
      title,
      era,
      introduction,
      characterId,
      textColor,
      location,
    },
    { accessToken },
  );

  return NextResponse.json(data);
}
