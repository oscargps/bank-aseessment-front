import { IProductCart } from "./IProduct";

export interface ITransaction {
  customerId: number;
  totalAmount: number;
  baseFee: number;
  deliveryFee: number;
  products: IProductTransaction[];
}
interface IProductTransaction extends Pick<IProductCart, "quantity"> {
  productId: number;
}

export interface IPresignedDocument {
  acceptance_token: string;
  permalink: string;
  type: string;
}

export interface ICreateTransactionResponse {
  reference: string;
  acceptanceToken: IPresignedDocument;
  personalDataToken: IPresignedDocument;
}
