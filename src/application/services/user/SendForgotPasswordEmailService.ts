import { getCustomRepository } from 'typeorm';
import UserTokensRepository from '@repositories/user/UserTokensRepository';
import UserRepository from '@repositories/user/UserRepository';
import AppError from '@errors/AppError';
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';

interface IRequest {
    email: string;
}

class SendForgotPasswordEmailService {
    public async execute({ email }: IRequest): Promise<void> {
        const userRepository = getCustomRepository(UserRepository);
        const userTokenRepository = getCustomRepository(UserTokensRepository);
     
        const user = await userRepository.findByEmail(email);
        
        if (!user){
            throw new AppError('USer does not exists.')
        }

        const { token } = await userTokenRepository.generate(user.id);
        
        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');
        
        await EtherealMail.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[API Vendas] Recuperação de Senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
                },
            },
        });
    }
}

export default SendForgotPasswordEmailService;
