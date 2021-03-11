import AppError from '@errors/AppError';
import { getCustomRepository } from 'typeorm';
import { isAfter, addHours } from 'date-fns'
import { hash } from 'bcryptjs';
import UserTokensRepository from '@repositories/user/UserTokensRepository';
import UserRepository from '@repositories/user/UserRepository';

interface IRequest {
    token: string;
    password: string;
}


class ResetPasswordService {
    public async execute({ token, password }: IRequest): Promise<void> {
        
        const userRepository = getCustomRepository(UserRepository);
        const userTokenRepository = getCustomRepository(UserTokensRepository);
     
        const userToken = await userTokenRepository.findByToken(token);


        if (!userToken){
            throw new AppError('user Token does not exists.')
        }
        
        const user = await userRepository.findById(userToken.user_id)

        if (!user){
            throw new AppError('user does not exists.')
        }
        const tokeCreatedAt = userToken.created_at;
        const compareDate = addHours(tokeCreatedAt,2);
        
        if (isAfter(Date.now(), compareDate)){
            throw new AppError('Token expired.')
        }
        
        user.password = await hash(password, 8)
        
        await userRepository.save(user)
    }
}

export default ResetPasswordService;
