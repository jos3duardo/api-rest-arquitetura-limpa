import { Request, Response } from 'express';
import CreateAuthService from '@services/user/CreateAuthService';
import { classToClass } from 'class-transformer';

export default class SessionControlle {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
        
        const createAuth = new CreateAuthService();
        
        const user = await createAuth.execute({
            email,
            password
        });

        console.log('aqui')

        return response.json(classToClass(user))
    }  
}
