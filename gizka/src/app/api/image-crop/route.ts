import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { httpClient } from '@/services/http-client';

export async function POST(request: Request) {
  const accessToken = cookies().get('userAccessToken')?.value;

  if (!accessToken) {
    return NextResponse.json({ status: 401, message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  const data = await httpClient.post(
    `/image-crop`,
    {
      base64Image: body.base64Image,
      crop: {
        x: body.crop?.x,
        y: body.crop?.y,
        width: body.crop?.width,
        height: body.crop?.height,
      },
      targetWidth: body.targetWidth,
      targetHeight: body.targetHeight,
    },
    { accessToken },
  );

  return NextResponse.json(data);
}
