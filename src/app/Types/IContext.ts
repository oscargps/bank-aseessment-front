import { IProduct, IProductCart } from "../../modules/bank-store/domain/models/IProduct";
import { ICreateTransactionResponse } from "../../modules/bank-store/domain/models/Itransaction";


export interface IContext {
    products: IProduct[];
    cart: IProductCart[];
    create_transaction_response:ICreateTransactionResponse
    addToCart: (product: IProduct) => void;
    removeFromCart: (product: IProductCart) => void;
    clearCart: () => void;
    saveTransactionResponse: (ressponse: ICreateTransactionResponse) => void;

}

