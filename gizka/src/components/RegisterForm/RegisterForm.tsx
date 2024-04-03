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
      mandatory: false,
    },
    {
      name: 'password',
      label: 'Mot de passe',
      type: 'password' as const,
      mandatory: false,
    },
    {
      name: 'username',
      label: "Nom d'utilisateur",
      type: 'text' as const,
      mandatory: false,
    },
  ];

  return <Form onSubmit={register} inputs={inputs} submitButtonLabel="S'inscrire" />;
}
