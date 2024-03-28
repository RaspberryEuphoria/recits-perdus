import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { httpClient, isHttpError } from '@/services/http-client';
import { User } from '@/utils/types/user';

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  const data = await httpClient.post<User>('/user/register', {
    name,
    email,
    password,
  });

  if (!isHttpError(data)) {
    cookies().set('userAccessToken', data.accessToken);
  }

  return NextResponse.json(data);
}
