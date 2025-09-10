export const REGION = 'northamerica-northeast1';

export const TIER = {
  STREETWISE: 'streetwise',
  HUSTLER: 'hustler',
  GODMODE: 'godmode',
};

// Daily AI seconds caps
export const DAILY_AI_SECONDS_CAP = {
  [TIER.STREETWISE]: 300, // 5:00
  [TIER.HUSTLER]: 900, // 15:00
  [TIER.GODMODE]: Number.POSITIVE_INFINITY,
};

export const EXP_VALUES = {
  AI_CALL: 2,
  MISSION_COMPLETE: 25,
  JOURNAL_ENTRY: 3,
  STREET_LOG: 2,
  LESSON_COMPLETE: 20,
  INCIDENT_REPORT: 10,
};

export const LIMITS = {
  AI_CALLS_PER_WINDOW: 30,
  AI_WINDOW_SEC: 600,
  LOGS_PER_WINDOW: 60,
  LOGS_WINDOW_SEC: 600,
  PANIC_PER_WINDOW: 6,
  PANIC_WINDOW_SEC: 600, // at most 6 panic presses / 10 min
};

// Panic scoring weights (simple, fast)
export const PANIC = {
  BASE: 2, // default risk
  NIGHT_HOUR_BONUS: 1, // +1 between 22:0005:59 local
  KEYWORDS_HIGH: [
    'weapon',
    'knife',
    'gun',
    'stalking',
    'choking',
    'bleeding',
    'unconscious',
  ],
  KEYWORDS_MED: [
    'followed',
    'threat',
    'scared',
    'panic',
    'police',
    'ambulance',
  ],
  MED_BONUS: 1,
  HIGH_BONUS: 2,
  GEO_BONUS_METERS: 30, // if near last panic within 30m within 1h, +1
};



