function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function createRoll(max: number) {
  return () => getRandom(1, max);
}
