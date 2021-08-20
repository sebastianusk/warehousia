export const configs = {
  DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/postgres',
  SESSION_EXPIRED: 86400000,
};

type Config = keyof typeof configs;

export function getEnv(key: Config): string {
  const env = process.env[key] || configs[key];
  if (typeof env !== 'string') {
    throw new Error(`env type asked is string, but got ${typeof env}`);
  }
  return env;
}

export function getEnvNumber(key: Config): number {
  const env = process.env[key] || configs[key];
  if (typeof env !== 'number') {
    throw new Error(`env type asked is string, but got ${typeof env}`);
  }
  return env;
}
