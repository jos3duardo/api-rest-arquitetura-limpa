import {Router} from 'express';
import usersRouter from '@routes/user/user.routes'
import authRouter from '@routes/user/authRouter';
import passwordRouter from '@routes/user/passwordRouter'
import profileRouter from '@routes/user/profileRouter';
import productsRouter from '@routes/product/productsRouter';
import customersRouter from '@routes/customer/customer.routes';
import ordersRouter from '@routes/order/orders.routes';

const routes = Router()

routes.use('/users', usersRouter);
routes.use('/auth', authRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

routes.use('/products', productsRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter)

routes.get('/',((req, res) => {
    return res.json({message: 'api online'})
}));

export default routes
