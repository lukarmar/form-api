import dotenv from 'dotenv';
dotenv.config();

import { EnvType } from './types';
import { EnvValidation } from './validation';
import { injectable } from 'inversify';

@injectable()
export class EnvService {
  private env: EnvType;

  private loadEnv(): EnvType {
    const env = process.env;
    const parsedEnv = EnvValidation.parse({ ...env });
    return parsedEnv;
  }
  public getEnv(): EnvType {
    if (!this.env) {
      this.env = this.loadEnv();
    }
    return this.env;
  }
  public get<R>(key: keyof EnvType): R {
    const env = this.getEnv();
    if (!env[key]) {
      throw new Error(`Key ${key} not found in environment variables`);
    }
    return env[key] as R;
  }
}
