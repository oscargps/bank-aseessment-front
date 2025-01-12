import config from "../../../../config";
import {
  METHODS,
  RequestService,
} from "../../../core/bussiness/helpers/serviceHelper";
import { IcreditCardData, ITokenizedCardResponse } from "../../domain/models/ICreditCard";
import {
  ICreateTransactionResponse,
  IPaymentData,
  IPaymentResponse,
  ITransaction,
} from "../../domain/models/Itransaction";
export class PaymentService {
  constructor() { }

  async createTransaction(
    transaction: ITransaction
  ): Promise<ICreateTransactionResponse> {

    try {
      const data = RequestService({
        url: `${config.url}/transactions`,
        headers: {},
        method: METHODS.POST,
        body: transaction,
      });
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async tokenizeCard(
    cardData: IcreditCardData
  ): Promise<ITokenizedCardResponse> {

    try {
      const data = RequestService({
        url: `${config.url}/transactions/tokenize-card`,
        headers: {},
        method: METHODS.POST,
        body: cardData,
      });
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async doPayment(
    paymentData: IPaymentData
  ): Promise<IPaymentResponse> {

    try {
      const data = RequestService({
        url: `${config.url}/transactions/payment`,
        headers: {},
        method: METHODS.POST,
        body: paymentData,
      });
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
