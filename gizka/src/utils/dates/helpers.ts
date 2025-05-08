export function timeSince(date: string | Date): { value: number; unit: string } {
  const now = new Date();
  const pastDate = new Date(date);
  const seconds = Math.floor((now.getTime() - pastDate.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.44); // Average month length
  const years = Math.floor(days / 365.25); // Average year length

  if (seconds < 60) {
    return {
      value: seconds,
      unit: 'seconds',
    };
  }

  if (minutes < 60) {
    return { value: minutes, unit: 'minutes' };
  }

  if (hours < 24) {
    return { value: hours, unit: 'hours' };
  }

  if (days < 30) {
    return { value: days, unit: 'days' };
  }

  if (months < 12) {
    return { value: months, unit: 'months' };
  }

  return { value: years, unit: 'years' };
}
