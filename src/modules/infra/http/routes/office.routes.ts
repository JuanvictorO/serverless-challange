import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import { OfficeController } from '../controllers/OfficeController';

const officeController = new OfficeController();

const officeRouter = Router();

officeRouter.get('/', officeController.index);

officeRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().max(45),
    },
  }),
  officeController.create,
);

export { officeRouter };
