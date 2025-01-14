import { ProductsUseCase } from '../../../modules/bank-store/bussiness/usecases/products.usecase';
import ProductsController from '../../../modules/bank-store/infrastructure/controllers/products.controller';
import { ProductsService } from '../../../modules/bank-store/infrastructure/services/products.service';
import { ProductsMock } from '../../__mocks__/products.mock';

jest.mock('../../../config', () => ({
    url: 'http://api.example.com'
}));

jest.mock('../../../modules/bank-store/bussiness/usecases/products.usecase');
jest.mock('../../../modules/bank-store/infrastructure/services/products.service');

describe('ProductsController', () => {
    let productsController: ProductsController;
    let mockProductsUseCase: jest.Mocked<ProductsUseCase>;
    let MockProductsService: jest.Mocked<ProductsService>;

    beforeEach(() => {
        jest.clearAllMocks();

        mockProductsUseCase = {
            getProducts: jest.fn(),
        } as unknown as jest.Mocked<ProductsUseCase>;

        MockProductsService = {
            getData: jest.fn(),
        } as unknown as jest.Mocked<ProductsService>;

        (ProductsUseCase as jest.Mock).mockImplementation(() => mockProductsUseCase);
        (ProductsService as jest.Mock).mockImplementation(() => MockProductsService);

        productsController = new ProductsController();
    });


    describe('getProductsStatus', () => {


        test('should get Products successfully', async () => {
            mockProductsUseCase.getProducts.mockResolvedValue(ProductsMock);

            const result = await productsController.getAllProducts();


            expect(result).toEqual(ProductsMock);
        });

        test('should handle error when getting Products status', async () => {
            const mockError = new Error('Status check failed');
            mockProductsUseCase.getProducts.mockRejectedValue(mockError);

            await expect(productsController.getAllProducts())
                .rejects
                .toThrow('Status check failed');
        });
    });
});