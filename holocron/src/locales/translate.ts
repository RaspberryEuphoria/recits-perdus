import moves from '../locales/fr/moves.json';
import scenarios from '../locales/fr/scenarios.json';

const namespaces = {
  moves,
  scenarios,
};

export function t(key: string) {
  const [namespace, path] = key.split(':');
  if (!path) return key;

  const keys = path.split('.');
  if (!(namespace in namespaces)) return key;

  const value = keys.reduce((acc: any, key: string) => {
    if (acc[key as keyof typeof acc] === undefined) {
      return key;
    }

    return acc[key as keyof typeof acc];
  }, namespaces[namespace as keyof typeof namespaces]);

  return value;
}
