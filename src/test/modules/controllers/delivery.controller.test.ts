import { DeliveryUseCase } from '../../../modules/bank-store/bussiness/usecases/delivery.usecase';
import DeliveryController from '../../../modules/bank-store/infrastructure/controllers/delivery.controller';
import { DeliveryService } from '../../../modules/bank-store/infrastructure/services/delivery.service';
import { DeliveryResponseMock } from '../../__mocks__/delivery.mock';

jest.mock('../../../config', () => ({
    url: 'http://api.example.com'
}));

jest.mock('../../../modules/bank-store/bussiness/usecases/delivery.usecase');
jest.mock('../../../modules/bank-store/infrastructure/services/delivery.service');
const mockDelivery = {
    address: "string",
    customerId: 1,
    reference: "string"
}
describe('DeliveryController', () => {
    let deliveryController: DeliveryController;
    let mockDeliveryUseCase: jest.Mocked<DeliveryUseCase>;
    let MockDeliveryService: jest.Mocked<DeliveryService>;

    beforeEach(() => {
        jest.clearAllMocks();

        mockDeliveryUseCase = {
            createDelivery: jest.fn(),
            getDeliveryStatus: jest.fn(),
        } as unknown as jest.Mocked<DeliveryUseCase>;

        MockDeliveryService = {
            createDelivery: jest.fn(),
            getDeliveryStatus: jest.fn(),
        } as unknown as jest.Mocked<DeliveryService>;

        (DeliveryUseCase as jest.Mock).mockImplementation(() => mockDeliveryUseCase);
        (DeliveryService as jest.Mock).mockImplementation(() => MockDeliveryService);

        deliveryController = new DeliveryController();
    });

    describe('create Delivery', () => {

        test('should create Delivery successfully', async () => {

            mockDeliveryUseCase.createDelivery.mockResolvedValue(DeliveryResponseMock);

            const result = await deliveryController.createDelivery(mockDelivery);
            expect(result).toEqual(DeliveryResponseMock);
        });

        test('should handle error during Delivery creation', async () => {
            const mockError = new Error('Delivery creation failed');
            mockDeliveryUseCase.createDelivery.mockRejectedValue(mockError);

            await expect(deliveryController.createDelivery(mockDelivery))
                .rejects
                .toThrow('Delivery creation failed');
        });
    });


    describe('getDeliveryStatus', () => {
        const mockReference = 'ref_123';


        test('should get Delivery status successfully', async () => {
            mockDeliveryUseCase.getDeliveryStatus.mockResolvedValue(DeliveryResponseMock);

            const result = await deliveryController.getDeliveryStatus(mockReference);


            expect(result).toEqual(DeliveryResponseMock);
        });

        test('should handle error when getting Delivery status', async () => {
            const mockError = new Error('Status check failed');
            mockDeliveryUseCase.getDeliveryStatus.mockRejectedValue(mockError);

            await expect(deliveryController.getDeliveryStatus(mockReference))
                .rejects
                .toThrow('Status check failed');
        });
    });
});