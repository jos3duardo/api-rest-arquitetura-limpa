import { getCustomRepository } from 'typeorm';
import ProductRepository from '@repositories/product/ProductsRepository';
import AppError from '@errors/AppError';
import redisCache from '@framework/cache/RedisCache';

interface IRequest {
    id: string;
}

class DeleteProductService {
    public async execute({ id }: IRequest): Promise<void> {
        const productsRepository = getCustomRepository(ProductRepository);

        const product = await productsRepository.findOne(id);

        if (!product) {
            throw new AppError('Product not found.');
        }

        await redisCache.invalidate('api-vendas-PRODUCT_LIST');

        await productsRepository.remove(product);
    }
}

export default DeleteProductService;
