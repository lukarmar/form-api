import { NextFunction, Request, Response } from 'express';
import { Schema, ZodError } from 'zod';

type RequestType = 'body' | 'query' | 'params' | 'headers';

export function validateRequestData(schema: Schema, reqProperties: RequestType[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validateData = reqProperties.reduce((acc, property) => ({ ...acc, ...req[property] }), {});
      const validated = schema.parse(validateData);

      reqProperties.forEach((requestType) => {
        Object.keys(req[requestType]).forEach((key) => {
          if (validated[key]) {
            req[requestType][key] = validated[key];
          }
        });
      });

      next();
    } catch (error: ZodError | unknown) {
      if (error instanceof ZodError) {
        const errorData = error.errors.map(({ path, code, message }) => ({
          field: path.join('.'),
          code,
          message,
        }));
        res.status(400).json({
          error: 'Invalid request data',
          data: errorData,
        });
      }
    }
  };
}
