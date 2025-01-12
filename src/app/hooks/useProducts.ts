import { useQuery } from '@tanstack/react-query';
import ProductsController from '../../modules/bank-store/infrastructure/controllers/products.controller';

const productsController = new ProductsController();

export const useFetchProducts = () => useQuery(
    ['Products'],
    () => productsController.getAllProducts(),
    {
        staleTime: 10000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
    }
);


