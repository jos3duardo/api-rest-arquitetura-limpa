import AppError from '@errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '@entity/order/Order';
import OrdersRepository from '@repositories/order/OrdersRepository';

interface IRequest {
    id: string;
}

class ShowOrderService {
    public async execute({ id }: IRequest): Promise<Order> {
        const ordersRepository = getCustomRepository(OrdersRepository);

        const order = await ordersRepository.findById(id);

        if (!order) {
            throw new AppError('Order not found.');
        }

        return order;
    }
}

export default ShowOrderService;
