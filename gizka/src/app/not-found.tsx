export const dynamic = 'force-dynamic';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Page introuvable !</h2>
      <Link href="/">Retourner à l&apos;accueil</Link>
    </div>
  );
}
