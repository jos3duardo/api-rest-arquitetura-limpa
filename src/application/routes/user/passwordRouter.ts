import {Router} from 'express';
import {celebrate, Joi, Segments} from 'celebrate';
import ForgotPasswordController from '@controllers/user/ForgotPasswordController';
import ResetPasswordController from '@controllers/user/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPassowdController = new ResetPasswordController(); 

passwordRouter.post(
    '/forgot',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
        }
    }),
    forgotPasswordController.create
);

passwordRouter.post(
    '/reset',
    celebrate({
        [Segments.BODY]: {
            token: Joi.string().uuid().required(),
            password: Joi.string().required(),
            password_confirmation: Joi.string().required().valid(
                Joi.ref('password')
            )
        }
    }),
    resetPassowdController.create
);


export default passwordRouter;
