'use client';

import { useEffect, useState } from 'react';

import { CharacterList } from '@/components/CharacterList';
import { Button } from '@/components/DesignSystem/Button';
import { LoginForm } from '@/components/LoginForm';
import { RegisterForm } from '@/components/RegisterForm';
import { useCharactersByUser } from '@/hooks/useCharacters';
import { httpBffClient, isHttpError } from '@/services/http-client';
import { useLocalStorage } from '@/utils/hooks/localStorage';
import { User } from '@/utils/types/user';

import * as Styled from './styled';

export function HomePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [activeForm, setActiveForm] = useState<'login' | 'register'>('login');
  const [currentUser, setLocalStorage] = useLocalStorage<User>('currentUser');
  const { characters } = useCharactersByUser(currentUser?.id);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    if (email && password) {
      const currentUser = await httpBffClient.post<User>('/user/login', { email, password });

      if (!isHttpError(currentUser)) {
        setLocalStorage(currentUser);
      } else {
        // @todo show error message
        alert('Identifiants incorrects');
      }
    }
  };

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = e.currentTarget.email.value;
    const name = e.currentTarget.username.value;
    const password = e.currentTarget.password.value;

    if (email && name && password) {
      const currentUser = await httpBffClient.post<User>('/user/register', {
        email,
        name,
        password,
      });

      if (!isHttpError(currentUser)) {
        setLocalStorage(currentUser);
      }
    }
  };

  const toggleActiveForm = () => {
    setActiveForm(activeForm === 'login' ? 'register' : 'login');
  };

  // @todo show skeleton loader
  useEffect(() => {
    setHasLoaded(true);
  }, []);

  if (!hasLoaded) return null;

  if (currentUser) {
    console.log(characters);
    return (
      <Styled.Home>
        {characters && <CharacterList characters={characters} asPreview={true} />}
      </Styled.Home>
    );
  }

  return (
    <Styled.Home>
      {activeForm === 'login' ? (
        <LoginForm onSubmit={login} />
      ) : (
        <RegisterForm onSubmit={register} />
      )}
      <Styled.Separator>ou</Styled.Separator>

      <Button onClick={toggleActiveForm} width="100%" outline>
        {activeForm === 'login' ? "S'inscrire" : 'Se connecter'}
      </Button>
    </Styled.Home>
  );
}
