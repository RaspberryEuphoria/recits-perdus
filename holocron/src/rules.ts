const DEFAULT_MOMENTUM = 2;
const MAX_MOMENTUM = 10;
const MIN_MOMENTUM = -6;

const DEFAULT_HEALTH = 5;
const MAX_HEALTH = 5;
const MIN_HEALTH = 0;

const DEFAULT_SPIRIT = 5;
const MAX_SPIRIT = 5;
const MIN_SPIRIT = 0;

export const STATS_LIMITS = {
  supplies: {
    min: 0,
    max: Infinity,
  },
  momentum: {
    min: MIN_MOMENTUM,
    max: MAX_MOMENTUM,
    default: DEFAULT_MOMENTUM,
  },
  health: {
    min: MIN_HEALTH,
    max: MAX_HEALTH,
    default: DEFAULT_HEALTH,
  },
  spirit: {
    min: MIN_SPIRIT,
    max: MAX_SPIRIT,
    default: DEFAULT_SPIRIT,
  },
};
