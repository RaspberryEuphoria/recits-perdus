import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string): [T | null, (value: T) => void, () => void] {
  const [value, setValue] = useState<T | null>(null);
  useEffect(() => {
    const stored = localStorage.getItem(key);
    setValue(stored ? JSON.parse(stored) : null);
  }, [key]);

  useEffect(() => {
    if (!value) return;
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const clearValue = () => {
    localStorage.removeItem(key);
    setValue(null);
  };

  return [value, setValue, clearValue];
}
