import {
    fireEvent,
    render, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTokenizeCard } from '../../../app/hooks/usePayment';
import { useAppContext } from '../../../app/hooks/useAppContext';
import { StoreAppProvider } from '../../../app/Context/Context';
import CreditCardForm from '../../../app/components/Payment/CreditCardForm.component';
const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUsedNavigate,
}));


jest.mock('../../../app/hooks/usePayment', () => ({
    useTokenizeCard: jest.fn(),
}));
jest.mock('../../../app/hooks/useAppContext', () => ({
    useAppContext: jest.fn(),
}));

jest.mock('@nextui-org/react', () => ({
    Button: ({ children, ...props }: { children: React.ReactNode }) => <button {...props}>{children}</button>,
    DrawerFooter: ({ children }: { children: React.ReactNode }) => <div data-testid="drawer-footer">{children}</div>,
    //@ts-ignore
    DrawerContent: ({ children }: { children: React.ReactNode }) => <div data-testid="drawer-content">{children(jest.fn())}</div>,
    Drawer: ({ children, isOpen }: { children: React.ReactNode, isOpen: Boolean }) => isOpen ? <div data-testid="drawer">{children}</div> : null,
    Input: ({ ...props }) => <input {...props} />,
    DrawerBody: ({ children }: { children: React.ReactNode }) => <div data-testid="drawer-body">{children}</div>,
    DrawerHeader: ({ children }: { children: React.ReactNode }) => <div data-testid="drawer-header">{children}</div>,
    Form: ({ children }: { children: React.ReactNode }) => <form>{children}</form>,
    PopoverTrigger: ({ children }: { children: React.ReactNode }) => children,
    Popover: ({ children }: { children: React.ReactNode }) => children,
    //@ts-ignore
    PopoverContent: ({ children }: { children: React.ReactNode }) => children({ className: 'mock-title-props' }),
})); describe('Credit Card Form Component', () => {

    it('should render the Credit Card Form Component', async () => {
        (useTokenizeCard as jest.MockedFunction<any>).mockReturnValue({
            data: {
                token_id: "string"
            },
            isSuccess: true
        });
        (useAppContext as jest.MockedFunction<any>).mockReturnValue({
            clearCart: jest.fn(),
            saveCreditCardData: jest.fn(),
            create_transaction_response: {
                reference: "1234",
                acceptanceToken: { acceptance_token: "1234", permalink: "http://test.com" },
                personalDataToken: { acceptance_token: "1234", permalink: "http://test.com" },
            }
        });

        const { getByTestId, debug } = render(
            <StoreAppProvider>
                <CreditCardForm isOpen onOpenChange={jest.fn()} />
            </StoreAppProvider>
        );
        const acceptanceTokenInput = getByTestId('acceptanceToken');
        const inputText = getByTestId('input-test');
        fireEvent.change(inputText, { target: { value: 'test' } })
        fireEvent.click(acceptanceTokenInput)
        await waitFor(() => {
            expect(getByTestId('drawer')).toBeInTheDocument();
        });
    });
}
)