import { NextResponse } from 'next/server';

import { httpClient } from '@/services/http-client';
import { CharacterStats } from '@/utils/types/character';

export async function GET() {
  const data = await httpClient.get<CharacterStats>('/character/stats');
  return NextResponse.json(data);
}
