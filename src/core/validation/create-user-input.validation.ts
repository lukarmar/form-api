import { z as ZodValidation } from 'zod';

export const CreateUserInputSchema = ZodValidation.object({
  name: ZodValidation.string().min(3),
  email: ZodValidation.string().email(),
  profile: ZodValidation.number().int(),
  taxIdentifier: ZodValidation.string().min(11).max(14),
  responsibleDocuments: ZodValidation.string().optional(),
  cellPhone: ZodValidation.string(),
  phone: ZodValidation.string().optional(),
});

export type CreateUserInputType = ZodValidation.infer<typeof CreateUserInputSchema>;
