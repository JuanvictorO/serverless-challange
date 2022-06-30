import { Router } from 'express';
import { employeeRouter } from './employee.routes';
import { officeRouter } from './office.routes';

const employeesRouter = Router();

employeesRouter.use('/office', officeRouter);
employeesRouter.use('/', employeeRouter);

export { employeesRouter };
