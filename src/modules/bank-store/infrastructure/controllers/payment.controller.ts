import { PaymentUseCase } from "../../bussiness/usecases/payment.usecase";
import { IcreditCardData } from "../../domain/models/ICreditCard";
import { IPaymentData, ITransaction } from "../../domain/models/Itransaction";
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
  tokenizeCard(cardData: IcreditCardData) {
    try {
      return this.paymentUseCase.tokenizeCard(this.paymentService, cardData);
    } catch (error: any) {
      throw new Error(error);
    }
  }
  doPayment(paymentData: IPaymentData) {
    try {
      return this.paymentUseCase.doPayment(this.paymentService, paymentData);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  getPaymentStatus(reference: string) {
    try {
      return this.paymentUseCase.getPaymentStatus(this.paymentService, reference);
    } catch (error: any) {
      throw new Error(error);
    }
  }
  
}
export default PaymentController;
