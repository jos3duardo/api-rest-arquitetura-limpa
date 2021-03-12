import { EntityRepository, In, Repository } from 'typeorm';
import Product from '@entity/product/Product';

interface IFindProducts {
    id: string
}

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
    public async findByName(name: string): Promise<Product | undefined> {
        return this.findOne({
            where: {
                name,
            },
        });
    }
    
    public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
        const productIds = products.map(product => product.id);
        
        const existProducts = await this.find({
            where: { 
                id: In(productIds) 
            } 
        });
        
        return existProducts;
    }
}

export default ProductRepository;
