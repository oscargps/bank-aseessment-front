import config from "../../../config";
import { ProductsService } from "../../../modules/bank-store/infrastructure/services/products.service";
import { RequestService } from "../../../modules/core/bussiness/helpers/serviceHelper";
import { ProductsMock } from "../../__mocks__/products.mock";

jest.mock('../../../modules/core/bussiness/helpers/serviceHelper', () => ({
    RequestService: jest.fn(),
    METHODS: {
        POST: 'POST',
        GET: 'GET'
    }
}));

jest.mock('../../../config', () => ({
    url: 'http://api.example.com'
}));

describe('ProductsService', () => {
    let productService: ProductsService;
    const mockConfig = { url: 'http://api.example.com' };

    beforeEach(() => {
        jest.clearAllMocks();
        productService = new ProductsService();
        config.url = mockConfig.url;
    });


    describe('get Products', () => {

        test('should get payment status successfully', async () => {
            (RequestService as jest.Mock).mockResolvedValueOnce(ProductsMock);

            const result = await productService.getData();

            expect(RequestService).toHaveBeenCalledWith({
                url: `${mockConfig.url}/products`,
                headers: {},
                method: 'GET'
            });
            expect(result).toEqual(ProductsMock);
        });

    });
});