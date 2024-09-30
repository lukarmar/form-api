import { z as ZodValidation } from 'zod';

export const CreateAddressInputSchema = ZodValidation.object({
  street: ZodValidation.string().min(3),
  number: ZodValidation.string().min(1),
  complement: ZodValidation.string().optional(),
  neighborhood: ZodValidation.string().min(3),
  city: ZodValidation.string().min(3),
  state: ZodValidation.string().min(2),
  country: ZodValidation.string().min(2),
  zipCode: ZodValidation.string().min(8),
  userId: ZodValidation.number().positive(),
});

export type CreateAddressInputType = ZodValidation.infer<typeof CreateAddressInputSchema>;
