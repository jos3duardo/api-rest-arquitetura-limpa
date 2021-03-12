import AppError from '@errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '@entity/customer/Customer';
import CustomerRepository from '@repositories/customer/CustomersRepository';
import { hash } from 'bcryptjs';

interface IRequest {
    name: string;
    email: string;
}

class CreateCustomerService {
    public async execute({ name, email }: IRequest): Promise<Customer> {
        
        const customersRepository = getCustomRepository(CustomerRepository);
        const customerExists = await customersRepository.findByEmail(email);

        if (customerExists) {
            throw new AppError('Email address is already ready used');
        }
        
        const customer = customersRepository.create({
            name,
            email,
        });

        await customersRepository.save(customer);
        
        return customer;
    }
}

export default CreateCustomerService;
