import { Container, inject } from 'inversify';
import { bindings } from '@infra/config/inversifyConfig';
import express from 'express';
import { TYPES } from '@core/constants';
import { EnvService } from '@infra/env';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import httpStatus from 'http-status';

import AppError from '@core/error/AppError';

class App {
  private application: express.Application;
  private container: Container;
  private server: InversifyExpressServer;

  constructor(@inject(TYPES.EnvService) private readonly envService: EnvService) {
    this.container = new Container();
    this.server = new InversifyExpressServer(this.container);
  }

  public async startServer() {
    const port = this.envService.get<number>('API_PORT');
    await this.loadBindings();
    await this.serverConfig();
    this.application.listen(port, () => console.log(`Server started on port ${port}`));
  }

  async serverConfig() {
    this.server.setConfig((app) => {
      app.use(
        bodyParser.urlencoded({
          extended: true,
        }),
      );
      app.use(express.json());
    });

    this.server.setErrorConfig((app) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      app.use((err: AppError | Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
        if (err instanceof AppError && err.isAppError) {
          res.status(httpStatus.BAD_REQUEST).json({
            message: err.message,
            code: err.code,
            options: err.options,
          });
        } else {
          res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: err.message,
          });
        }
      });
    });
    this.application = this.server.build();
  }

  async loadBindings() {
    await this.container.loadAsync(bindings);
  }

  get app(): express.Application {
    return this.application;
  }

  get containerInstance(): Container {
    return this.container;
  }

  get serverInstance(): InversifyExpressServer {
    return this.server;
  }
}

export default App;
