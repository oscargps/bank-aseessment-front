import React, { createContext, useReducer } from 'react';

import { initialState } from './InitialState';
import { AppReducers } from './Reducers';
import { IProduct, IProductCart } from '../../modules/bank-store/domain/models/IProduct';
import { ICreateTransactionResponse } from '../../modules/bank-store/domain/models/Itransaction';
import { IcreditCardData } from '../../modules/bank-store/domain/models/ICreditCard';


export const StoreAppContext = createContext(initialState);

type Props = {
  children: React.ReactNode;
}

function useAppReducer() {
  const [AppState, dispatch] = useReducer(AppReducers, initialState);

  const addToCart = (product: IProduct) =>
    dispatch({
      type: 'ADD_TO_CART',
      payload: product,
    });
  const removeFromCart = (product: IProductCart) =>
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: product,
    });
  const clearCart = () =>
    dispatch({
      type: 'CLEAR_CART',
    });
  const saveTransactionResponse = (response: ICreateTransactionResponse) =>
    dispatch({
      type: 'SAVE_TRANSACTION_RESPONSE',
      payload: response,
    });
  const saveCreditCardData = (card_data: IcreditCardData) =>
    dispatch({
      type: 'SAVE_CREDIT_CARD_DATA',
      payload: card_data,
    });


  return {
    AppState,
    reducers: {
      addToCart,
      removeFromCart,
      clearCart,
      saveTransactionResponse,
      saveCreditCardData
    },
  };
}

export function StoreAppProvider(props: Props) {
  const { children } = props;
  const AppReducer = useAppReducer();


  return (
    <StoreAppContext.Provider value={{ ...AppReducer.AppState, ...AppReducer.reducers }}>
      {children}
    </StoreAppContext.Provider>
  );
}
