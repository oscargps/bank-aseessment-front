import { IProduct } from "../../../modules/bank-store/domain/models/IProduct";
import { ICreateTransactionResponse } from "../../../modules/bank-store/domain/models/Itransaction";
import { StorageHelper } from "../../../modules/core/bussiness/helpers/storageHelper";
import { IContext } from "../../Types/IContext";
const ACTION_TYPES = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  CLEAR_CART: "CLEAR_CART",
  SAVE_TRANSACTION_RESPONSE: "SAVE_TRANSACTION_RESPONSE",
};

const UPDATE_STATE_BY_ACTION: { [key: string]: any } = {
  [ACTION_TYPES.ADD_TO_CART]: (AppState: IContext, action: any) => {
    const data = action.payload as IProduct;
    const newState = {
      ...AppState,
      cart: AppState.cart.some((item) => item.id === data.id)
        ? AppState.cart.map((item) =>
            item.id === data.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...AppState.cart, { ...data, quantity: 1 }],
    };
    StorageHelper.save("cart", newState.cart);
    return newState;
  },
  [ACTION_TYPES.REMOVE_FROM_CART]: (AppState: IContext, action: any) => {
    const data = action.payload as IProduct;
    const newState = {
      ...AppState,
      cart: AppState.cart.filter((item) => item.id !== data.id),
    };
    StorageHelper.save("cart", newState.cart);
    return newState;
  },
  [ACTION_TYPES.CLEAR_CART]: (AppState: IContext) => {
    const newState = {
      ...AppState,
      cart: [],
    };
    StorageHelper.remove("cart");
    return newState;
  },
  [ACTION_TYPES.SAVE_TRANSACTION_RESPONSE]: (
    AppState: IContext,
    action: any
  ) => {
    const data = action.payload as ICreateTransactionResponse;
    const newState = {
      ...AppState,
      create_transaction_response: data,
    };
    StorageHelper.save("cart", newState.cart);
    return newState;
  },
};
export const AppReducers = (AppState: IContext, action: any) => {
  const { type: actionType } = action;
  const updateState = UPDATE_STATE_BY_ACTION[actionType];
  return updateState ? updateState(AppState, action) : AppState;
};
