import { Router } from 'express'
import CustomerController from '@controllers/customer/CustomerController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@framework/middlewares/isAuthenticated';

const customersRouter = Router();
const customersController = new CustomerController()

customersRouter.use(isAuthenticated)

customersRouter.get('/', customersController.index);

customersRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    customersController.show
);

customersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
          name: Joi.string().required(),
          email: Joi.string().email().required(),
        }
    }),
    customersController.create
);

customersRouter.put(
    '/:id',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    customersController.update
);

customersRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    customersController.delete
);

export default customersRouter;
