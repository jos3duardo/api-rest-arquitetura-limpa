import { getCustomRepository } from 'typeorm';
import Product from '@entity/product/Product';
import ProductRepository from '@repositories/product/ProductsRepository';
import redisCache from '@framework/cache/RedisCache';

class ListProductService {
    public async execute(): Promise<Product[]> {
        
        const productsRepository = getCustomRepository(ProductRepository);

        let products = await redisCache.recover<Product[]>(
            'api-vendas-PRODUCT_LIST'
        );
        
        if (!products){
            products = await productsRepository.find();

            redisCache.save('api-vendas-PRODUCT_LIST', products)

        }
        
        
        return products; 
    }
}

export default ListProductService;
