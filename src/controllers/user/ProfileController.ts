import { Request, Response } from 'express';
import UpdateProfileService from '@services/user/UpdateProfileService';
import ShowProfileService from '@services/user/ShowProfileService';
import { classToClass } from 'class-transformer';

export default class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const showProfile = new ShowProfileService();
        const user_id = request.user.id;
        
        const user = await showProfile.execute({ user_id });
        return response.json(classToClass(user))
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { name, email, password, old_password } = request.body;
        
        const user_id = await request.user.id;
        
        const updateProfile = new UpdateProfileService();

        const user = await updateProfile.execute({ 
            user_id, name, email, password, old_password 
        });

        return response.json(classToClass(user))
    }
}
