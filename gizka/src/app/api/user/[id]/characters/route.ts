import { NextResponse } from 'next/server';

import { httpClient } from '@/services/http-client';
import { CharacterSkill } from '@/utils/types/character';

export async function GET(request: Request, { params: { id } }: { params: { id: string } }) {
  const data = await httpClient.get(`/user/${id}/characters`);

  return NextResponse.json(data);
}

export async function POST(request: Request, { params: { id } }: { params: { id: string } }) {
  const { characterSkills, ...body } = await request.json();

  const characterBody = {
    ...body,
    story: '',
    skills: characterSkills.map((skill: CharacterSkill) => skill.id),
  };

  const data = await httpClient.post(`/user/${id}/characters`, characterBody);
  return NextResponse.json(data);
}
