import 'reflect-metadata';
import 'dotenv/config';
import swaggetUi from 'swagger-ui-express';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';

import * as Sentry from '@sentry/node';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import '@shared/infra/typeorm';
import '@shared/container';

import { AppError } from '@shared/errors/AppError';

import { errors, isCelebrateError } from 'celebrate';
import cors from 'cors';

import routes from './routes';
import swaggerFile from '../../../docs/swagger.json';

// Patch Repository with BaseRepository
patchTypeORMRepositoryWithBaseRepository();

const app = express();

// Only production mode
if (process.env.APP_MODE !== 'development') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [new Sentry.Integrations.Http({ tracing: true })],
    tracesSampleRate: 1.0,
  });

  app.use(Sentry.Handlers.requestHandler());
}

app.use(cors());
app.use(express.json());

app.use('/docs', swaggetUi.serve, swaggetUi.setup(swaggerFile));

app.use(routes);

// Init error handler if not mode development
if (process.env.APP_MODE !== 'development') {
  app.use(
    Sentry.Handlers.errorHandler({
      shouldHandleError(error) {
        if (error instanceof AppError || isCelebrateError(error)) {
          return false;
        }
        return true;
      },
    }) as express.ErrorRequestHandler,
  );
}

app.use(errors());

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
