import { ProductsUseCase } from "../../bussiness/usecases/products.usecase";
import { ProductsService } from "../services/products.service";

class ProductsController {
  private productsService: ProductsService;

  private productsUseCase: ProductsUseCase;

  constructor() {
    this.productsService = new ProductsService();
    this.productsUseCase = new ProductsUseCase();
  }

  getAllProducts() {
    return this.productsUseCase.getProducts(this.productsService);
  }
}
export default ProductsController;
