import express, { NextFunction } from 'express';
import swaggetUi from 'swagger-ui-express';

import * as Sentry from '@sentry/node';

import { Router, Request, Response } from 'express';
import cors from 'cors';
import expressBasicAuth from 'express-basic-auth';

import swaggerFile from '../../../docs/swagger.json';
import { AppError } from '@shared/errors/AppError';
import { errors, isCelebrateError } from 'celebrate';

const app = express();

const route = Router();

app.use(cors());
app.use(express.json());

app.use(
  '/docs',
  expressBasicAuth({
    users: {
      storytrackin: 'developer',
    },
    challenge: true,
  }),
  swaggetUi.serve,
  swaggetUi.setup(swaggerFile),
);

// Only production mode
if (process.env.APP_MODE !== 'development') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [new Sentry.Integrations.Http({ tracing: true })],
    tracesSampleRate: 1.0,
  });

  app.use(Sentry.Handlers.requestHandler());
}

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

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' });
});

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

app.use(route);

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});

