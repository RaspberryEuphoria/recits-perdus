export function timeSince(date: string | Date): { value: number; unit: string } {
  const now = new Date();
  const pastDate = new Date(date);
  const seconds = Math.floor((now.getTime() - pastDate.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.44); // Average month length
  const years = Math.floor(days / 365.25); // Average year length

  if (seconds < 120) {
    return {
      value: seconds,
      unit: 'Sec',
    };
  }

  if (minutes < 120) {
    return { value: minutes, unit: 'Min' };
  }

  if (hours < 48) {
    return { value: hours, unit: 'Hr' };
  }

  if (days < 60) {
    return { value: days, unit: 'Day' };
  }

  if (months < 12) {
    return { value: months, unit: 'Mon' };
  }

  return { value: years, unit: 'Yr' };
}
