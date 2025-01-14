import {
    fireEvent,
    render, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductsMock } from '../../__mocks__/products.mock';
import { useCreateDelivery } from '../../../app/hooks/useDelivery';
import { useAppContext } from '../../../app/hooks/useAppContext';
import { StoreAppProvider } from '../../../app/Context/Context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DeliveryPage from '../../../app/pages/Delivery.page';
const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUsedNavigate,
}));

jest.mock('../../../app/hooks/useDelivery', () => ({
    useCreateDelivery: jest.fn(),
}));
jest.mock('../../../app/hooks/useAppContext', () => ({
    useAppContext: jest.fn(),
}));

let queryClient = new QueryClient();
describe('Delivery Page', () => {

    it('should render the delivery page', async () => {
        (useCreateDelivery as jest.MockedFunction<any>).mockReturnValue({ mutate: jest.fn() });
        (useAppContext as jest.MockedFunction<any>).mockReturnValue({
            cart: ProductsMock.map(products => ({ ...products, quantity: 1 })),
            clearCart: jest.fn(),
            create_transaction_response: {
                reference: "1234",
            },
        });
        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <StoreAppProvider>
                    <DeliveryPage />
                </StoreAppProvider>
            </QueryClientProvider>,
        );
        await waitFor(() => {
            expect(getByTestId('delivery-page')).toBeInTheDocument();
        });
    });
    it('should render the delivery page branch 1', async () => {
        (useCreateDelivery as jest.MockedFunction<any>).mockReturnValue({ mutate: jest.fn(), isSuccess: true });
        (useAppContext as jest.MockedFunction<any>).mockReturnValue({
            cart: ProductsMock.map(products => ({ ...products, quantity: 1 })),
            clearCart: jest.fn(),
            create_transaction_response: {
                reference: "1234",
            },
        });
        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <StoreAppProvider>
                    <DeliveryPage />
                </StoreAppProvider>
            </QueryClientProvider>,
        );
        const addressInput = getByTestId('address');
        const confirmButton = getByTestId('confirm-button');
        fireEvent.change(addressInput, {target: {value: 'large direction'}})
        fireEvent.click(confirmButton);
        await waitFor(() => {
            expect(getByTestId('delivery-page')).toBeInTheDocument();
        });
    });
    it('should render the delivery page branch 2', async () => {
        (useCreateDelivery as jest.MockedFunction<any>).mockReturnValue({ mutate: jest.fn(), isError: true });
        (useAppContext as jest.MockedFunction<any>).mockReturnValue({
            cart: ProductsMock.map(products => ({ ...products, quantity: 1 })),
            clearCart: jest.fn(),
            create_transaction_response: {
                reference: "1234",
            },
        });
        const { getByTestId, debug } = render(
            <QueryClientProvider client={queryClient}>
                <StoreAppProvider>
                    <DeliveryPage />
                </StoreAppProvider>
            </QueryClientProvider>,
        );
        const confirmButton = getByTestId('confirm-button');
        fireEvent.click(confirmButton);
        await waitFor(() => {
            expect(getByTestId('delivery-page')).toBeInTheDocument();
        });
    });
}
)