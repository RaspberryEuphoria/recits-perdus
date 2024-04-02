import { NextResponse } from 'next/server';

import { httpClient } from '@/services/http-client';

export async function PUT(
  request: Request,
  { params: { id, characterId } }: { params: { id: string; characterId: string } },
) {
  const body = await request.json();

  const data = await httpClient.put(`/user/${id}/characters/${characterId}/avatar`, {
    base64Avatar: body.base64Image,
    crop: {
      x: body.crop.x,
      y: body.crop.y,
      width: body.crop.width,
      height: body.crop.height,
    },
  });

  return NextResponse.json(data);
}
