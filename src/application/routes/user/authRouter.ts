import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import AuthControlle from '@controllers/user/AuthController';

const authRouter = Router();
const authController = new AuthControlle();

authRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }),
    authController.create
);

export default authRouter;
