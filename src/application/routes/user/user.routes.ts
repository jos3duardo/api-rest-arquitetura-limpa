import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import UserController from '@controllers/user/UserController';
import isAuthenticated from '@middlewares/isAuthenticated'
import uploadConfig from '@config/uploads';
import UserAvatarController from '@controllers/user/UserAvatarController';

const usersRouter = Router();
const usersController = new UserController();
const usersAvatarController = new UserAvatarController();

const upload = multer(uploadConfig)

usersRouter.get(
    '/', 
    isAuthenticated, 
    usersController.index
);

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }),
    usersController.create
);

usersRouter.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    usersAvatarController.update,
)


export default usersRouter;
