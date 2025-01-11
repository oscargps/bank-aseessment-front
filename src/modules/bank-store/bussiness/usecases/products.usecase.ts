import { ProductsService } from '../../infrastructure/services/products.service';
import { IProduct } from '../../domain/models/IProduct';

export class ProductsUseCase {
  async getProducts(RequestService: ProductsService): Promise<IProduct[]> {
    const response = await RequestService.getData();
    return this.mapProducts(response);
  }

  private mapProducts(dto: IProduct[]): IProduct[] {
    return dto.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
      image: product.image,
      createAt: product.createAt,
      updateAt: product.updateAt,
    }));
  }
}
