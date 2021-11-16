export const configs = {
  DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/postgres',
  SESSION_EXPIRED: 86400000,
  JWT_SECRET: 'secretKey',
  JWT_EXPIRES_IN: '360s',
  DEMAND_EXPIRED_AT: 5,
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
  const env = parseInt(process.env[key], 10) || configs[key];
  if (typeof env !== 'number') {
    throw new Error(`env type asked is number, but got ${typeof env}`);
  }
  return env;
}
