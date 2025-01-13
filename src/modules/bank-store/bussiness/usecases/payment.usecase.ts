import {
  IcreditCardData,
  ITokenizedCardResponse,
} from "../../domain/models/ICreditCard";
import {
  ICreateTransactionResponse,
  IPaymentData,
  IPaymentDetailsResponse,
  IPaymentResponse,
  ITransaction,
} from "../../domain/models/Itransaction";
import { PaymentService } from "../../infrastructure/services/payment.service";

export class PaymentUseCase {
  async createTransaction(
    RequestService: PaymentService,
    transaction: ITransaction
  ): Promise<ICreateTransactionResponse> {
    try {
      return await RequestService.createTransaction(transaction);
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async tokenizeCard(
    RequestService: PaymentService,
    cardData: IcreditCardData
  ): Promise<ITokenizedCardResponse> {
    try {
      return await RequestService.tokenizeCard(cardData);
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async doPayment(
    RequestService: PaymentService,
    paymentData: IPaymentData
  ): Promise<IPaymentResponse> {
    try {
      return await RequestService.doPayment(paymentData);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getPaymentStatus(
    RequestService: PaymentService,
    reference: string
  ): Promise<IPaymentDetailsResponse> {
    return await RequestService.getPaymentStatus(reference);
  }
}
