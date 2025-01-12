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

export interface IPaymentData {
  reference: string;
  tokenId: string;
  installments: number;
  acceptanceToken: string;
  personalDataToken: string;
}

export interface IPaymentResponse {
  data: {
    id: string;
    created_at: string;
    amount_in_cents: number;
    reference: string;
    customer_email: string;
    currency: string;
    payment_method_type: string;
    payment_method: {
      type: string;
      installments: number;
      token: string;
    };
    status: string;
    status_message: string;
    shipping_address: null | any;
    redirect_url: string;
    payment_source_id: null | string;
    payment_link_id: null | string;
  };
  meta: Record<string, unknown>;
}