import { NextResponse } from 'next/server';
import { httpClient } from '@/services/http-client';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const data = await httpClient.post('/user/login', {
    email,
    password,
  });

  return NextResponse.json(data);
}
