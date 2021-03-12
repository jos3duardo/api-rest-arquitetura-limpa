import AppError from '@errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '@entity/product/Product';
import ProductRepository from '@repositories/product/ProductsRepository';
import redisCache from '@framework/cache/RedisCache';

interface IRequest {
    name: string;
    price: number;
    quantity: number;
}

class CreateProductService {
    public async execute({ name, price, quantity }: IRequest): Promise<Product> {
        
        const productsRepository = getCustomRepository(ProductRepository);
        const productExists = await productsRepository.findByName(name);

        if (productExists) {
            throw new AppError('There is already one product with this name');
        }
        
        const product = productsRepository.create({
            name,
            price,
            quantity,
        });

        await redisCache.invalidate('api-vendas-PRODUCT_LIST')
        
        await productsRepository.save(product);

        return product;
    }
}

export default CreateProductService;
