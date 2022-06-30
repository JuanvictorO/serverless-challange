import { Router } from 'express';
import { employeeRouter } from './employee.routes';

const employeesRouter = Router();

employeesRouter.use('/', employeeRouter);

export { employeesRouter };
