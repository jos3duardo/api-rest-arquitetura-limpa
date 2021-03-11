import AppError from '@errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '@entity/user/User';
import UsersRepository from '@repositories/user/UserRepository';

interface IRequest {
    user_id: string;
}

class ShowProfileService {
    public async execute({ user_id }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('user not found.');
        }

        return user;
    }
}

export default ShowProfileService;
