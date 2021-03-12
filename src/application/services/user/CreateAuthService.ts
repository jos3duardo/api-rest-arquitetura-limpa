import AppError from '@errors/AppError';
import {getCustomRepository} from 'typeorm';
import User from '@entity/user/User';
import UserRepository from '@repositories/user/UserRepository';
import {compare} from 'bcryptjs';
import {sign} from "jsonwebtoken";
import authConfig from '@config/auth';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User,
    token: string
}

class CreateAuthService {
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findByEmail(email);
        
        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordConfirmed = await compare(password, user.password);

        if (!passwordConfirmed) {
            throw new AppError('Incorrect email/password combination.', 401);
        }
        
        const token = sign(
            {},
            authConfig.jwt.secret,
            {
                subject: user.id,
                expiresIn: authConfig.jwt.expiresIn
            });

        return {
            user,
            token
        };
    }
}

export default CreateAuthService;
