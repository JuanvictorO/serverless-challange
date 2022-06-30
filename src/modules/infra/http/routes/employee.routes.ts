import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import { EmployeeController } from '../controllers/EmployeeController';

const employeeController = new EmployeeController();

const employeeRouter = Router();

employeeRouter.get('/', employeeController.index);

employeeRouter.get('/:id', employeeController.show);

employeeRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().max(100),
      birthday: Joi.date().required(),
      office_id: Joi.string().required(),
    },
  }),
  employeeController.create,
);

employeeRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().max(100),
      birthday: Joi.date().required(),
      office_id: Joi.string().required(),
    },
  }),
  employeeController.update,
);

employeeRouter.delete('/:id', employeeController.delete);

export { employeeRouter };
