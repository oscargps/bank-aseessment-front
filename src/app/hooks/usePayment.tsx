import { useMutation } from '@tanstack/react-query';
import PaymentController from '../../modules/bank-store/infrastructure/controllers/payment.controller';
import { ITransaction } from '../../modules/bank-store/domain/models/Itransaction';

const paymentController = new PaymentController();

export const useCreateTransaction = () => useMutation({
    mutationFn: (transaction: ITransaction) => {
        return paymentController.createTransaction(transaction)
    },
});



