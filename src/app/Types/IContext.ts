import { IProduct, IProductCart } from "../../modules/bank-store/domain/models/IProduct";


export interface IContext {
    products: IProduct[];
    cart: IProductCart[];
    addToCart: (product: IProduct) => void;
    removeFromCart: (product: IProductCart) => void;

}

