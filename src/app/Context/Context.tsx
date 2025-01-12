import React, { createContext, useReducer } from 'react';

import { initialState } from './InitialState';
import { AppReducers } from './Reducers';
import { IProduct, IProductCart } from '../../modules/bank-store/domain/models/IProduct';


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


  return {
    AppState,
    reducers: {
      addToCart,
      removeFromCart,
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
