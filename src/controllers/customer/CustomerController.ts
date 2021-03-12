import { Request, Response } from 'express';
import ListCustomerService from '@services/customer/ListCustomerService';
import ShowCustomerService from '@services/customer/ShowCustomerService';
import CreateCustomerService from '@services/customer/CreateCustomerService';
import UpdateCustomerService from '@services/customer/UpdateCustomerService';
import DeleteCustomerService from '@services/customer/DeleteCustomerService';

export default class CustomerController {
    public async index(request: Request, response: Response): Promise<Response> {
        const listCustomer = new ListCustomerService();

        const customer = await listCustomer.execute();
        console.log(customer)
        return response.json(customer);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showCustomer = new ShowCustomerService();

        const customer = await showCustomer.execute({ id });

        return response.json(customer);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email } = request.body;

        const createCustomer = new CreateCustomerService();
        const customer = await createCustomer.execute({
            name,
            email,
        });

        return response.json(customer);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { name, email } = request.body;
        const { id } = request.params;

        const updateCustomer = new UpdateCustomerService();

        const customer = await updateCustomer.execute({
            id,
            name,
            email,
        });

        return response.json(customer);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteCustomer = new DeleteCustomerService();

        await deleteCustomer.execute({ id });

        return response.json([])
    }

}
