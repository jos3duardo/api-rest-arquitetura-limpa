import { getCustomRepository } from 'typeorm';
import Customer from '@entity/customer/Customer';
import CustomerRepository from '@repositories/customer/CustomersRepository';
import AppError from '@errors/AppError';

interface IRequest {
    id: string,
    name: string,
    email: string,
}

class UpdateCustomerService {
    public async execute({ 
        id,
        name,
        email,
    }: IRequest): Promise<Customer> {
        const customerRepository = getCustomRepository(CustomerRepository);
        
        const customer = await customerRepository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found.');
        }
        
        const customerExist = await customerRepository.findByEmail(customer.email);
        
        if (customerExist && email !== customer.email) {
            throw new AppError('There is already one customer with this email.');
        }
        
        
        customer.name = name;
        customer.email = email;
        
        await customerRepository.save(customer)
        
        return customer;
    }
}

export default UpdateCustomerService;
