import { EntityRepository, Repository } from 'typeorm';
import User from '@entity/user/User'

@EntityRepository(User)
class UserRepository extends Repository<User> {
    public async findByName(name: string): Promise<User | undefined> {
        const user = await this.findOne({
            where: {
                name,
            },
        });
        
        return user;
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.findOne({
            where: {
                id,
            },
        });

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        
        const user = await this.findOne({
            where: {
                email,
            },
        });
        console.log('depois do find')

        return user;
    }
}


export default UserRepository
