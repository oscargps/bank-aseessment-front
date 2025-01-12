import { IContext } from "../Types/IContext";

export const initialState: IContext = {
  products: [],
  cart: [],
  addToCart: () => { },
  removeFromCart: () => { },
};
