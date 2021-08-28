import { getEnv } from '../config';

const jwtConstants = {
  secret: getEnv('JWT_SECRET'),
  expiresIn: getEnv('JWT_EXPIRES_IN'),
};

export default jwtConstants;
