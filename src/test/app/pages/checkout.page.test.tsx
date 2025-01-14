import {
    render, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductsMock } from '../../__mocks__/products.mock';
import { useAppContext } from '../../../app/hooks/useAppContext';
import { StoreAppProvider } from '../../../app/Context/Context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CheckoutPage from '../../../app/pages/Checkout.page';
import { useCreateTransaction, useTokenizeCard } from '../../../app/hooks/usePayment';
import { useDisclosure } from '@nextui-org/react';
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));
jest.mock('@nextui-org/react', () => ({
    ...jest.requireActual('@nextui-org/react'),
    useDisclosure: jest.fn(),
}));

jest.mock('../../../app/hooks/usePayment', () => ({
    useCreateTransaction: jest.fn(),
    useTokenizeCard: jest.fn(),
}));

jest.mock('../../../app/hooks/useAppContext', () => ({
    useAppContext: jest.fn(),
}));

let queryClient = new QueryClient();
describe('Checkout Page', () => {

    it('should render the Checkout page', async () => {
        (useCreateTransaction as jest.MockedFunction<any>).mockReturnValue({ data: ProductsMock, mutate: jest.fn() });
        (useTokenizeCard as jest.MockedFunction<any>).mockReturnValue({ data: ProductsMock });
        (useDisclosure as jest.MockedFunction<any>).mockReturnValue({ isOpen: false, onOpen: jest.fn(), onOpenChange: jest.fn() });
        (useAppContext as jest.MockedFunction<any>).mockReturnValue({
            cart: ProductsMock.map(products => ({...products, quantity: 1})),
            saveTransactionResponse: jest.fn(),
            saveCreditCardData: jest.fn(),
            create_transaction_response: jest.fn(),
            clearCart: jest.fn(),
        });
        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <StoreAppProvider>
                    <CheckoutPage />
                </StoreAppProvider>
            </QueryClientProvider>,
        );
        await waitFor(() => {
            expect(getByTestId('checkout-page')).toBeInTheDocument();
        });
    });
    it('should render the Checkout page - branch', async () => {
        (useCreateTransaction as jest.MockedFunction<any>).mockReturnValue({ data: ProductsMock, mutate: jest.fn(), isLoading: true, isSuccess: true });
        (useTokenizeCard as jest.MockedFunction<any>).mockReturnValue({ data: ProductsMock });
        (useDisclosure as jest.MockedFunction<any>).mockReturnValue({ isOpen: false, onOpen: jest.fn(), onOpenChange: jest.fn() });
        (useAppContext as jest.MockedFunction<any>).mockReturnValue({
            cart: [],
            saveTransactionResponse: jest.fn(),
            saveCreditCardData: jest.fn(),
            clearCart: jest.fn(),
            create_transaction_response: {
                reference: "1234",
                acceptanceToken: { acceptance_token: "1234", permalink: "http://test.com" },
                personalDataToken: { acceptance_token: "1234", permalink: "http://test.com" },
            },
        });
        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <StoreAppProvider>
                    <CheckoutPage />
                </StoreAppProvider>
            </QueryClientProvider>,
        );
        await waitFor(() => {
            expect(getByTestId('checkout-page')).toBeInTheDocument();
        });
    });
    it('should render the Checkout page - branch - 2', async () => {
        (useCreateTransaction as jest.MockedFunction<any>).mockReturnValue({ data: ProductsMock, mutate: jest.fn(), isError: true });
        (useTokenizeCard as jest.MockedFunction<any>).mockReturnValue({ data: ProductsMock });
        (useDisclosure as jest.MockedFunction<any>).mockReturnValue({ isOpen: false, onOpen: jest.fn(), onOpenChange: jest.fn() });
        (useAppContext as jest.MockedFunction<any>).mockReturnValue({
            cart: [],
            saveTransactionResponse: jest.fn(),
            saveCreditCardData: jest.fn(),
            create_transaction_response: jest.fn(),
            clearCart: jest.fn(),
        });
        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <StoreAppProvider>
                    <CheckoutPage />
                </StoreAppProvider>
            </QueryClientProvider>,
        );
        await waitFor(() => {
            expect(getByTestId('checkout-page')).toBeInTheDocument();
        });
    });
}
)