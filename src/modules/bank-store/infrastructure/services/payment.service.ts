import config from "../../../../config";
import {
  METHODS,
  RequestService,
} from "../../../core/bussiness/helpers/serviceHelper";
import {
  ICreateTransactionResponse,
  ITransaction,
} from "../../domain/models/Itransaction";
export class PaymentService {
  constructor() {}

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
        return data ;
      } catch (error: any) {
        throw new Error(error);
      }
   
  }
}
