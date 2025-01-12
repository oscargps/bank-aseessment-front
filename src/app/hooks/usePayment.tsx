import { useMutation } from '@tanstack/react-query';
import PaymentController from '../../modules/bank-store/infrastructure/controllers/payment.controller';
import { IPaymentData, ITransaction } from '../../modules/bank-store/domain/models/Itransaction';
import { IcreditCardData } from '../../modules/bank-store/domain/models/ICreditCard';

const paymentController = new PaymentController();

export const useCreateTransaction = () => useMutation({
    mutationFn: (transaction: ITransaction) => {
        return paymentController.createTransaction(transaction)
    },
});
export const useTokenizeCard = () => useMutation({
    mutationFn: (cardData: IcreditCardData) => {
        return paymentController.tokenizeCard(cardData)
    },
});
export const useDoPayment = () => useMutation({
    mutationFn: (paymentData: IPaymentData) => {
        return paymentController.doPayment(paymentData)
    },
});



