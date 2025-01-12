import { StorageHelper } from "../../modules/core/bussiness/helpers/storageHelper";
import { IContext } from "../Types/IContext";

export const initialState: IContext = {
  products: [],
  cart: StorageHelper.get("cart") || [],
  create_transaction_response: {
    reference: "",
    acceptanceToken: { acceptance_token: "", permalink: "", type: "" },
    personalDataToken: { acceptance_token: "", permalink: "", type: "" },
  },
  credit_card_data: {
    token_id: "",
    installments: 0
  },
  addToCart: () => { },
  clearCart: () => { },
  removeFromCart: () => { },
  saveTransactionResponse: () => { },
  saveCreditCardData: () => { },
};
