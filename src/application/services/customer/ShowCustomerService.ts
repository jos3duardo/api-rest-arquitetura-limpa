import AppError from '@errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '@entity/customer/Customer';
import CustomersRepository from '@repositories/customer/CustomersRepository';

interface IRequest {
    id: string;
}

class ShowCustomerService {
    public async execute({ id }: IRequest): Promise<Customer> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const customer = await customersRepository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found.');
        }

        return customer;
    }
}

export default ShowCustomerService;
