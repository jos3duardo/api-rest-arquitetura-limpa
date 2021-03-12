import { getCustomRepository } from 'typeorm';
import Product from '@entity/product/Product';
import ProductRepository from '@repositories/product/ProductsRepository';
import AppError from '@errors/AppError';
import redisCache from '@framework/cache/RedisCache';

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

class UpdateProductService {
    public async execute({id, name, price, quantity}: IRequest): Promise<Product> {

        const productsRepository = getCustomRepository(ProductRepository);

        const product = await productsRepository.findOne(id);

        if (!product){
            throw new AppError('Product not found');
        }

        await redisCache.invalidate('api-vendas-PRODUCT_LIST')

        const productExists = await productsRepository.findByName(name);

        if (productExists) {
            throw new AppError('There is already one product with this name');
        }
        
        product.name = name;
        product.price = price;
        product.quantity = quantity;
        
        await productsRepository.save(product);
        
        return product;
    }
}

export default UpdateProductService;
