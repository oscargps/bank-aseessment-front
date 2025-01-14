import {
    render, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductsMock } from '../../__mocks__/products.mock';
import { useFetchProducts } from '../../../app/hooks/useProducts';
import { useAppContext } from '../../../app/hooks/useAppContext';
import ProductsPage from '../../../app/pages/Products.page';
import { StoreAppProvider } from '../../../app/Context/Context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

jest.mock('../../../app/hooks/useProducts', () => ({
    useFetchProducts: jest.fn(),
}));
jest.mock('../../../app/hooks/useAppContext', () => ({
    useAppContext: jest.fn(),
}));

let queryClient = new QueryClient();
describe('Products Page', () => {

    it('should render the products page', async () => {
        (useFetchProducts as jest.MockedFunction<any>).mockReturnValue({data:ProductsMock});
        (useAppContext as jest.MockedFunction<any>).mockReturnValue({
            cart: ProductsMock.map(products => ({...products, quantity: 1})),
            addToCart: jest.fn()
        });
        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <StoreAppProvider>
                    <ProductsPage />
                </StoreAppProvider>
            </QueryClientProvider>,
        );
        await waitFor(() => {
            expect(getByTestId('products-page')).toBeInTheDocument();
        });
    });
}
)