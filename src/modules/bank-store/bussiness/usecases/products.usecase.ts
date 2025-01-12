import { ProductsService } from '../../infrastructure/services/products.service';
import { IProduct } from '../../domain/models/IProduct';

export class ProductsUseCase {
  async getProducts(RequestService: ProductsService): Promise<IProduct[]> {
    return await RequestService.getData();
  }
}
