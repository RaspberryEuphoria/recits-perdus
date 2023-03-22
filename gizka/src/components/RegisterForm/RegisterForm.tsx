import { Form } from '@/components/DesignSystem/Form';

export function RegisterForm({
  onSubmit: register,
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
    {
      name: 'username',
      label: "Nom d'utilisateur",
      type: 'text' as const,
    },
  ];

  return <Form onSubmit={register} inputs={inputs} submitButtonLabel="S'inscrire" />;
}
