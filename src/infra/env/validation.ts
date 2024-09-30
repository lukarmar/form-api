import { z as ZodValidation } from 'zod';

export const EnvValidation = ZodValidation.object({
  MYSQLDB_DATABASE: ZodValidation.string(),
  MYSQLDB_USER: ZodValidation.string(),
  MYSQLDB_PASSWORD: ZodValidation.string(),
  MYSQLDB_PORT: ZodValidation.string(),
  API_PORT: ZodValidation.string()
    .optional()
    .default('4568')
    .transform((val) => parseInt(val)),
  NODE_ENV: ZodValidation.string().optional().default('development'),
});
