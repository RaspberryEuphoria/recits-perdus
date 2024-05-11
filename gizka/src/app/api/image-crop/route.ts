import { NextResponse } from 'next/server';

import { httpClient } from '@/services/http-client';

export async function POST(request: Request) {
  const body = await request.json();

  const data = await httpClient.post(`/image-crop`, {
    base64Image: body.base64Image,
    crop: {
      x: body.crop.x,
      y: body.crop.y,
      width: body.crop.width,
      height: body.crop.height,
    },
    targetWidth: body.targetWidth,
    targetHeight: body.targetHeight,
  });

  return NextResponse.json(data);
}
