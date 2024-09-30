import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import '@infra/http/controllers';

import { EnvService } from '@infra/env';
import App from './app';

const app = new App(new EnvService());

(async () => {
  await app.startServer();
})();
