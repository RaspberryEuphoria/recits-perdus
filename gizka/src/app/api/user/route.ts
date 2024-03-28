import { NextResponse } from 'next/server';

import { httpClient } from '@/services/http-client';
import { User } from '@/utils/types/user';

export async function GET(request: Request) {
  const { accessToken } = await request.json();

  const data = await httpClient.get<User>(`/user/${accessToken}`);

  return NextResponse.json(data);
}
