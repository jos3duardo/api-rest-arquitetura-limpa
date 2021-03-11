import { Request, Response } from 'express';
import ListUsersService from '@services/user/ListUsersService';
import CreateUserService from "@services/user/CreateUserService";
import { classToClass } from 'class-transformer';

export default class UserController {
    public async index(request: Request, response: Response): Promise<Response> {
        const listUser = new ListUsersService();
        const users = await listUser.execute();
        
        return response.json(classToClass(users))
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({ name, email, password });

        return response.json(classToClass(user))
    }
}
