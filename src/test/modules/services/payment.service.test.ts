import config from "../../../config";
import { PaymentService } from "../../../modules/bank-store/infrastructure/services/payment.service";
import { RequestService } from "../../../modules/core/bussiness/helpers/serviceHelper";
import { mockPaymentData, mockTransaction } from "../../__mocks__/payment.mock";

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

describe('PaymentService', () => {
    let paymentService: PaymentService;
    const mockConfig = { url: 'http://api.example.com' };

    beforeEach(() => {
        jest.clearAllMocks();
        paymentService = new PaymentService();
        config.url = mockConfig.url;
    });

    describe('createTransaction', () => {


        const mockResponse = {
            transactionId: '123',
            status: 'created',
            acceptanceToken: { permalink: 'test-url' },
            personalDataToken: { permalink: 'test-url' }
        };

        test('should create transaction successfully', async () => {
            (RequestService as jest.Mock).mockResolvedValueOnce(mockResponse);

            const result = await paymentService.createTransaction(mockTransaction);

            expect(RequestService).toHaveBeenCalledWith({
                url: `${mockConfig.url}/transactions`,
                headers: {},
                method: 'POST',
                body: mockTransaction
            });
            expect(result).toEqual(mockResponse);
        });

        test('should throw error when transaction creation fails', async () => {
            const mockError = new Error('Transaction failed');
            (RequestService as jest.Mock).mockRejectedValueOnce(mockError);

            await expect(paymentService.createTransaction(mockTransaction))
                .rejects
                .toThrow('Transaction failed');
        });
    });

    describe('tokenizeCard', () => {
        const mockCardData = {
            number: '4111111111111111',
            exp_month: '12',
            exp_year: '25',
            cvc: '123',
            card_holder: 'John Doe'
        };

        const mockResponse = {
            token_id: 'tok_123',
            last_four: '1111'
        };

        test('should tokenize card successfully', async () => {
            (RequestService as jest.Mock).mockResolvedValueOnce(mockResponse);

            const result = await paymentService.tokenizeCard(mockCardData);

            expect(RequestService).toHaveBeenCalledWith({
                url: `${mockConfig.url}/transactions/tokenize-card`,
                headers: {},
                method: 'POST',
                body: mockCardData
            });
            expect(result).toEqual(mockResponse);
        });

        test('should throw error when tokenization fails', async () => {
            const mockError = new Error('Tokenization failed');
            (RequestService as jest.Mock).mockRejectedValueOnce(mockError);

            await expect(paymentService.tokenizeCard(mockCardData))
                .rejects
                .toThrow('Tokenization failed');
        });
    });

    describe('doPayment', () => {

        const mockResponse = {
            payment_id: 'pay_123',
            status: 'approved'
        };

        test('should process payment successfully', async () => {
            (RequestService as jest.Mock).mockResolvedValueOnce(mockResponse);

            const result = await paymentService.doPayment(mockPaymentData);

            expect(RequestService).toHaveBeenCalledWith({
                url: `${mockConfig.url}/transactions/payment`,
                headers: {},
                method: 'POST',
                body: mockPaymentData
            });
            expect(result).toEqual(mockResponse);
        });

        test('should throw error when payment fails', async () => {
            const mockError = new Error('Payment failed');
            (RequestService as jest.Mock).mockRejectedValueOnce(mockError);

            await expect(paymentService.doPayment(mockPaymentData))
                .rejects
                .toThrow('Payment failed');
        });
    });

    describe('getPaymentStatus', () => {
        const mockReference = 'ref_123';
        const mockResponse = {
            status: 'approved',
            payment_method: 'credit_card',
            amount: 100
        };

        test('should get payment status successfully', async () => {
            (RequestService as jest.Mock).mockResolvedValueOnce(mockResponse);

            const result = await paymentService.getPaymentStatus(mockReference);

            expect(RequestService).toHaveBeenCalledWith({
                url: `${mockConfig.url}/transactions/status/${mockReference}`,
                headers: {},
                method: 'GET'
            });
            expect(result).toEqual(mockResponse);
        });

        test('should throw error when getting status fails', async () => {
            const mockError = new Error('Status check failed');
            (RequestService as jest.Mock).mockRejectedValueOnce(mockError);

            await expect(paymentService.getPaymentStatus(mockReference))
                .rejects
                .toThrow(mockError);
        });
    });
});