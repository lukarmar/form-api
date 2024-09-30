import { z as ZodValidation } from 'zod';
import { EnvValidation } from './validation';

export type EnvType = ZodValidation.infer<typeof EnvValidation>;
