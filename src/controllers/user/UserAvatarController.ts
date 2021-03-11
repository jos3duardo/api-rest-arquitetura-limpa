import { Request, Response } from 'express';
import UpdateUserAvatarService from '@services/user/UpdateUserAvatarService';
import { classToClass } from 'class-transformer';

export default class UserAvatarController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateAvatar = new UpdateUserAvatarService()
        
        const user = updateAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.originalname
        });

        return response.json(classToClass(user))
    }
}
