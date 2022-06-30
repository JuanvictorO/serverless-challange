import { Router } from 'express';

import { employeesRouter } from '@modules/infra/http/routes/index.routes';

const routes = Router();

routes.use('/employee', employeesRouter);

export default routes;
