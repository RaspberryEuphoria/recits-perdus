import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { httpClient } from '@/services/http-client';
import { CharacterSkill } from '@/utils/types/character';

export async function GET(request: Request, { params: { id } }: { params: { id: string } }) {
  const data = await httpClient.get(`/user/${id}/characters`);

  return NextResponse.json(data);
}

export async function POST(request: Request, { params: { id } }: { params: { id: string } }) {
  const accessToken = cookies().get('userAccessToken')?.value;

  if (!accessToken) {
    return NextResponse.json({ status: 401, message: 'Unauthorized' }, { status: 401 });
  }

  const { characterSkills, firstName, lastName, age, isTitleSuffix } = await request.json();

  const characterBody = {
    firstName,
    lastName,
    age,
    isTitleSuffix,
    story: '',
    origin: '',
    title: '',
    skills: (characterSkills ?? []).map((skill: CharacterSkill) => skill.id),
  };

  const data = await httpClient.post(`/user/${id}/characters`, characterBody, { accessToken });
  return NextResponse.json(data);
}
