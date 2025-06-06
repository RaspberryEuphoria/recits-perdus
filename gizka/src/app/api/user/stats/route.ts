import { NextResponse } from 'next/server';

import { httpClient } from '@/services/http-client';
import { UserStats } from '@/utils/types/user';

export async function GET() {
  try {
    const data = await httpClient.get<UserStats>('/user/stats');

    return NextResponse.json(data);
  } catch(err) {
    console.log("Big Error HERE !!!")
    console.log(err);
  }
}

  // const response = await fetch(process.env.API_PREFIX_URL + '/user/stats');
  // const data = await response.json();