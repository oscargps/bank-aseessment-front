import { useContext } from 'react';
import { StoreAppContext } from '../Context/Context';
import { IContext } from '../Types/IContext';

export const useAppContext = () => {
  const context: IContext = useContext(StoreAppContext);

  if (context === undefined) {
    throw new Error('Context not defined');
  }

  return context;
};
