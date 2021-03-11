import { getCustomRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import User from '@entity/user/User';
import UserRepository from '@repositories/user/UserRepository';
import AppError from '@errors/AppError';

interface IRequest {
    user_id: string,
    name: string,
    email: string,
    password?: string,
    old_password?: string
}

class UpdateProfileService {
    public async execute({ 
        user_id,
        name,
        email,
        password,
        old_password
    }: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UserRepository);
        
        const user = await userRepository.findById(user_id);

        if (!user) {
            throw new AppError('user not found.');
        }
        
        const userUpdateEmail = await userRepository.findByEmail(user.email);
        
        if (userUpdateEmail && userUpdateEmail.id !== user_id) {
            throw new AppError('There is already one user with this email.');
        }
        
        if (password && !old_password) {
            throw new AppError('Old password is required.');
        }

        if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);
            
            if (!checkOldPassword) {
                throw new AppError('Old password does not match.');
            }
            
            user.password = await  hash(password, 8);
        }
        
        user.name = name;
        user.email = email;
        
        await userRepository.save(user)
        
        return user;
    }
}

export default UpdateProfileService;
