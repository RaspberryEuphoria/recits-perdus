'use client';

import { useContext, useEffect, useState } from 'react';

import { Button } from '@/components/DesignSystem/Button';
import { LoginForm } from '@/components/LoginForm';
import { RegisterForm } from '@/components/RegisterForm';
import { UserCharacterList } from '@/components/UserCharacterList';
import { UserContext } from '@/contexts/user';
import { useCharactersByUser } from '@/hooks/useCharacters';
import { httpBffClient, isHttpError } from '@/services/http-client';
import { User } from '@/utils/types/user';

import * as Styled from './styled';

type LoginOrRegisterProps = {
  defaultActiveForm?: 'login' | 'register';
};

export function LoginOrRegister(props: LoginOrRegisterProps) {
  const { defaultActiveForm } = props;

  const [hasLoaded, setHasLoaded] = useState(false);
  const [activeForm, setActiveForm] = useState<'login' | 'register'>(defaultActiveForm || 'login');
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { characters } = useCharactersByUser(currentUser?.id);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    if (email && password) {
      const currentUser = await httpBffClient.post<User>('/user/login', { email, password });

      if (isHttpError(currentUser)) {
        alert('Identifiants incorrects');
        // @todo show error message
      } else {
        setCurrentUser && setCurrentUser(currentUser);
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

      if (isHttpError(currentUser)) {
        alert('Une erreur est survenue');
        // @todo show error message
      } else {
        setCurrentUser && setCurrentUser(currentUser);
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
    return (
      <Styled.Home fullwidth>
        {characters && <UserCharacterList characters={characters} />}
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
