import { getCustomRepository } from 'typeorm';
import User from '@entity/user/User';
import UserRepository from '@repositories/user/UserRepository';

class ListUsersService {
    public async execute(): Promise<User[]> {
        const userRepository = getCustomRepository(UserRepository);
        
        const user = await userRepository.find();

        return user;
    }
}

export default ListUsersService;
