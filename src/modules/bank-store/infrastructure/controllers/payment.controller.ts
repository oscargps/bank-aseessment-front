import { PaymentUseCase } from "../../bussiness/usecases/payment.usecase";
import { ITransaction } from "../../domain/models/Itransaction";
import { PaymentService } from "../services/payment.service";

class PaymentController {
  private paymentService: PaymentService;

  private paymentUseCase: PaymentUseCase;

  constructor() {
    this.paymentService = new PaymentService();
    this.paymentUseCase = new PaymentUseCase();
  }

  createTransaction(transaction: ITransaction) {
    try {
      return this.paymentUseCase.createTransaction(
        this.paymentService,
        transaction
      );
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
export default PaymentController;
