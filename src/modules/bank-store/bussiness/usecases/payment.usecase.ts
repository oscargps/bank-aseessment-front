import {
  ICreateTransactionResponse,
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
}
