import { PaymentUseCase } from '../../../modules/bank-store/bussiness/usecases/payment.usecase';
import PaymentController from '../../../modules/bank-store/infrastructure/controllers/payment.controller';
import { PaymentService } from '../../../modules/bank-store/infrastructure/services/payment.service';
import { mockCreateTransactionResponse, mockPaymentData, mockPaymentDataStatus, mockPaymentResponse, mockTransaction } from '../../__mocks__/payment.mock';

jest.mock('../../../config', () => ({
    url: 'http://api.example.com'
}));

jest.mock('../../../modules/bank-store/bussiness/usecases/payment.usecase');
jest.mock('../../../modules/bank-store/infrastructure/services/payment.service');

describe('PaymentController', () => {
    let paymentController: PaymentController;
    let mockPaymentUseCase: jest.Mocked<PaymentUseCase>;
    let mockPaymentService: jest.Mocked<PaymentService>;

    beforeEach(() => {
        jest.clearAllMocks();

        mockPaymentUseCase = {
            createTransaction: jest.fn(),
            tokenizeCard: jest.fn(),
            doPayment: jest.fn(),
            getPaymentStatus: jest.fn(),
        } as unknown as jest.Mocked<PaymentUseCase>;

        mockPaymentService = {
            createTransaction: jest.fn(),
            tokenizeCard: jest.fn(),
            doPayment: jest.fn(),
            getPaymentStatus: jest.fn(),
        } as unknown as jest.Mocked<PaymentService>;

        (PaymentUseCase as jest.Mock).mockImplementation(() => mockPaymentUseCase);
        (PaymentService as jest.Mock).mockImplementation(() => mockPaymentService);

        paymentController = new PaymentController();
    });

    describe('createTransaction', () => {

        test('should create transaction successfully', async () => {
            mockPaymentUseCase.createTransaction.mockResolvedValue(mockCreateTransactionResponse);

            const result = await paymentController.createTransaction(mockTransaction);
            expect(result).toEqual(mockCreateTransactionResponse);
        });

        test('should handle error during transaction creation', async () => {
            const mockError = new Error('Transaction creation failed');
            mockPaymentUseCase.createTransaction.mockRejectedValue(mockError);

            await expect(paymentController.createTransaction(mockTransaction))
                .rejects
                .toThrow('Transaction creation failed');
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
            mockPaymentUseCase.tokenizeCard.mockResolvedValue(mockResponse);

            const result = await paymentController.tokenizeCard(mockCardData);

            expect(result).toEqual(mockResponse);
        });

        test('should handle error during card tokenization', async () => {
            const mockError = new Error('Card tokenization failed');
            mockPaymentUseCase.tokenizeCard.mockRejectedValue(mockError);

            await expect(paymentController.tokenizeCard(mockCardData))
                .rejects
                .toThrow('Card tokenization failed');
        });
    });

    describe('doPayment', () => {


        test('should process payment successfully', async () => {
            mockPaymentUseCase.doPayment.mockResolvedValue(mockPaymentResponse);

            const result = await paymentController.doPayment(mockPaymentData);


            expect(result).toEqual(mockPaymentResponse);
        });

        test('should handle error during payment processing', async () => {
            const mockError = new Error('Payment processing failed');
            mockPaymentUseCase.doPayment.mockRejectedValue(mockError);

            await expect(paymentController.doPayment(mockPaymentData))
                .rejects
                .toThrow('Payment processing failed');
        });
    });

    describe('getPaymentStatus', () => {
        const mockReference = 'ref_123';


        test('should get payment status successfully', async () => {
            mockPaymentUseCase.getPaymentStatus.mockResolvedValue(mockPaymentDataStatus);

            const result = await paymentController.getPaymentStatus(mockReference);


            expect(result).toEqual(mockPaymentDataStatus);
        });

        test('should handle error when getting payment status', async () => {
            const mockError = new Error('Status check failed');
            mockPaymentUseCase.getPaymentStatus.mockRejectedValue(mockError);

            await expect(paymentController.getPaymentStatus(mockReference))
                .rejects
                .toThrow('Status check failed');
        });
    });
});