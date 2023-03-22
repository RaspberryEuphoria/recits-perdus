import { Form } from '@/components/DesignSystem/Form';

export function LoginForm({
  onSubmit: login,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}) {
  const inputs = [
    {
      name: 'email',
      label: 'Adresse email',
      type: 'email' as const,
    },
    {
      name: 'password',
      label: 'Mot de passe',
      type: 'password' as const,
    },
  ];

  return <Form onSubmit={login} inputs={inputs} submitButtonLabel="Se connecter" />;
}
