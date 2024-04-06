import { useCallback, useEffect, useState } from 'react';

import { httpBffClient, isHttpError } from '@/services/http-client';
import { Character } from '@/utils/types/character';

export function useCharactersByUser(userId?: number) {
  const [characters, setCharacters] = useState<Array<Character>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const getCharacters = useCallback(async () => {
    setIsLoading(true);

    const characters = await httpBffClient.get<Array<Character>>(`/user/${userId}/characters`);

    if (isHttpError(characters)) {
      setHasError(true);
    } else {
      setCharacters(characters);
    }

    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    if (userId) getCharacters();
  }, [getCharacters, userId]);

  const refresh = () => {
    if (userId) getCharacters();
  };

  return {
    characters,
    isLoading,
    hasError,
    refresh,
  };
}
