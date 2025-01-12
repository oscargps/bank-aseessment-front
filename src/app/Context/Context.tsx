import React, { createContext, useReducer } from 'react';

import { initialState } from './InitialState';
import { AppReducers } from './Reducers';
import { IProduct, IProductCart } from '../../modules/bank-store/domain/models/IProduct';
import { ICreateTransactionResponse } from '../../modules/bank-store/domain/models/Itransaction';


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


  return {
    AppState,
    reducers: {
      addToCart,
      removeFromCart,
      clearCart,
      saveTransactionResponse
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
