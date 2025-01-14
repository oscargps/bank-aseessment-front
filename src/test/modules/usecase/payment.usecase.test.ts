import { PaymentUseCase } from "../../../modules/bank-store/bussiness/usecases/payment.usecase";
import { PaymentService } from "../../../modules/bank-store/infrastructure/services/payment.service";
import { mockCreateTransactionResponse, mockPaymentData, mockPaymentDataStatus, mockPaymentResponse, mockTransaction } from "../../__mocks__/payment.mock";

jest.mock('../../../modules/bank-store/infrastructure/services/payment.service');

describe('PaymentUseCase', () => {
    let paymentUseCase: PaymentUseCase;
    let mockPaymentService: jest.Mocked<PaymentService>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockPaymentService = {
            createTransaction: jest.fn(),
            tokenizeCard: jest.fn(),
            doPayment: jest.fn(),
            getPaymentStatus: jest.fn(),
        } as unknown as jest.Mocked<PaymentService>;
        paymentUseCase = new PaymentUseCase();
    });

    describe('createTransaction', () => {


        test('should successfully create a transaction', async () => {
            mockPaymentService.createTransaction.mockResolvedValue(mockCreateTransactionResponse);

            const result = await paymentUseCase.createTransaction(
                mockPaymentService,
                mockTransaction
            );

            expect(mockPaymentService.createTransaction).toHaveBeenCalledWith(mockTransaction);
            expect(result).toEqual(mockCreateTransactionResponse);
        });

        test('should throw error when transaction creation fails', async () => {
            const mockError = new Error('Failed to create transaction');
            mockPaymentService.createTransaction.mockRejectedValue(mockError);

            await expect(
                paymentUseCase.createTransaction(mockPaymentService, mockTransaction)
            ).rejects.toThrow('Failed to create transaction');
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
        };

        test('should successfully tokenize a card', async () => {
            mockPaymentService.tokenizeCard.mockResolvedValue(mockResponse);

            const result = await paymentUseCase.tokenizeCard(
                mockPaymentService,
                mockCardData
            );

            expect(mockPaymentService.tokenizeCard).toHaveBeenCalledWith(mockCardData);
            expect(result).toEqual(mockResponse);
        });

        test('should throw error when card tokenization fails', async () => {
            const mockError = new Error('Failed to tokenize card');
            mockPaymentService.tokenizeCard.mockRejectedValue(mockError);

            await expect(
                paymentUseCase.tokenizeCard(mockPaymentService, mockCardData)
            ).rejects.toThrow('Failed to tokenize card');
        });
    });

    describe('doPayment', () => {

        test('should successfully process payment', async () => {
            mockPaymentService.doPayment.mockResolvedValue(mockPaymentResponse);

            const result = await paymentUseCase.doPayment(
                mockPaymentService,
                mockPaymentData
            );

            expect(mockPaymentService.doPayment).toHaveBeenCalledWith(mockPaymentData);
            expect(result).toEqual(mockPaymentResponse);
        });

        test('should throw error when payment processing fails', async () => {
            const mockError = new Error('Payment processing failed');
            mockPaymentService.doPayment.mockRejectedValue(mockError);

            await expect(
                paymentUseCase.doPayment(mockPaymentService, mockPaymentData)
            ).rejects.toThrow('Payment processing failed');
        });
    });

    describe('getPaymentStatus', () => {
        const mockReference = 'ref_123';

        test('should successfully get payment status', async () => {
            mockPaymentService.getPaymentStatus.mockResolvedValue(mockPaymentDataStatus);

            const result = await paymentUseCase.getPaymentStatus(
                mockPaymentService,
                mockReference
            );

            expect(mockPaymentService.getPaymentStatus).toHaveBeenCalledWith(mockReference);
            expect(result).toEqual(mockPaymentDataStatus);
        });

        test('should propagate error when getting payment status fails', async () => {
            const mockError = new Error('Failed to get payment status');
            mockPaymentService.getPaymentStatus.mockRejectedValue(mockError);

            await expect(
                paymentUseCase.getPaymentStatus(mockPaymentService, mockReference)
            ).rejects.toThrow('Failed to get payment status');
        });
    });

    describe('Error handling', () => {
        test('should preserve error object properties', async () => {
            const mockError = new Error('Custom error');
            mockError.name = 'ValidationError';
            mockPaymentService.createTransaction.mockRejectedValue(mockError);

            await expect(
                paymentUseCase.createTransaction(mockPaymentService, {} as any)
            ).rejects.toThrow('Custom error');
        });

        test('should handle non-Error objects in catch block', async () => {
            mockPaymentService.tokenizeCard.mockRejectedValue('String error');

            await expect(
                paymentUseCase.tokenizeCard(mockPaymentService, {} as any)
            ).rejects.toThrow('String error');
        });
    });
});