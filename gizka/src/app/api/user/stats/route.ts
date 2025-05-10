export const revalidate = 0;

import { NextResponse } from 'next/server';

import { httpClient } from '@/services/http-client';
import { UserStats } from '@/utils/types/user';

export async function GET() {
  const data = await httpClient.get<UserStats>('/user/stats');
  return NextResponse.json(data);
}
