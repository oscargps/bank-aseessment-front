import { StorageHelper } from "../../modules/core/bussiness/helpers/storageHelper";
import { IContext } from "../Types/IContext";

export const initialState: IContext = {
  products: [],
  cart: StorageHelper.get('cart') || [],
  addToCart: () => { },
  removeFromCart: () => { },
};
