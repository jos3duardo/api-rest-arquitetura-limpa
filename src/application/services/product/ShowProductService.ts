import { getCustomRepository } from 'typeorm';
import Product from '@entity/product/Product';
import ProductRepository from '@repositories/product/ProductsRepository';
import AppError from '@errors/AppError';
import { response } from 'express';

interface IRequest {
    id: string;
}

class ShowProductService {
    public async execute({ id }: IRequest): Promise<Product> {
        
        const productsRepository = getCustomRepository(ProductRepository);

        const product = await productsRepository.findOne(id);
        
        if (!product){
            throw new AppError('Product not found')
        }
        
        return product;
    }
}

export default ShowProductService;
