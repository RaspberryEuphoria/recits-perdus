import { NextResponse } from 'next/server';

import { httpClient } from '@/services/http-client';
import { ScenarioStats } from '@/utils/types/scenario';

export async function GET() {
  const data = await httpClient.get<ScenarioStats>('/scenario/stats');
  return NextResponse.json(data);
}
