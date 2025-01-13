import { useMutation, useQuery } from '@tanstack/react-query';
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

export const useDoPayment = (paymentData: IPaymentData) => {
    const doPayment = () => paymentController.doPayment(paymentData);

    return useQuery(['DoPayment'], () => doPayment(),
        {
            staleTime: 0,
            cacheTime: 0,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: false,
        },
    );
}

export const usePaymentDetail = (reference: string) => useQuery(
    ['PaymentDetail'],
    () => paymentController.getPaymentStatus(reference),
    {
        staleTime: 0,
        cacheTime: 0,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
        enabled: false
    }
);


