import { useEffect, useState } from 'react';

import { httpBffClient, isHttpError } from '@/services/http-client';
import { Character } from '@/utils/types/character';

export function useCharactersByUser(userId?: number) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getCharacters = async () => {
      setIsLoading(true);

      const characters = await httpBffClient.get<Character[]>(`/user/${userId}/characters`);

      if (isHttpError(characters)) {
        setHasError(true);
      } else {
        setCharacters(characters);
      }

      setIsLoading(false);
    };

    if (userId) getCharacters();
  }, [userId]);

  return {
    characters,
    isLoading,
    hasError,
  };
}
