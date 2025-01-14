import config from "../../../config";
import { DeliveryService } from "../../../modules/bank-store/infrastructure/services/delivery.service";
import { RequestService } from "../../../modules/core/bussiness/helpers/serviceHelper";
import { DeliveryResponseMock } from "../../__mocks__/delivery.mock";

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

describe('DeliveryService', () => {
    let deliveryService: DeliveryService;
    const mockConfig = { url: 'http://api.example.com' };

    beforeEach(() => {
        jest.clearAllMocks();
        deliveryService = new DeliveryService();
        config.url = mockConfig.url;
    });

    describe('createDelivery', () => {

        test('should create delivery successfully', async () => {
            (RequestService as jest.Mock).mockResolvedValueOnce(DeliveryResponseMock);

            const deliveryRequest = {
                address: "string",
                customerId: 1,
                reference: "string"
            }

            const result = await deliveryService.createDelivery(deliveryRequest)

            expect(RequestService).toHaveBeenCalledWith({
                url: `${mockConfig.url}/deliveries`,
                headers: {},
                method: 'POST',
                body: deliveryRequest
            });
            expect(result).toEqual(DeliveryResponseMock);
        });
    });


    describe('getDeliveryStatus', () => {
        const mockReference = 'ref_123';

        test('should get delivery status successfully', async () => {
            (RequestService as jest.Mock).mockResolvedValueOnce(DeliveryResponseMock);

            const result = await deliveryService.getDeliveryStatus(mockReference);

            expect(RequestService).toHaveBeenCalledWith({
                url: `${mockConfig.url}/deliveries/${mockReference}`,
                headers: {},
                method: 'GET'
            });
            expect(result).toEqual(DeliveryResponseMock);
        });

    });
});