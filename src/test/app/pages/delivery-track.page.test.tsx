import {
    render, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { useGetDeliveryStatus } from '../../../app/hooks/useDelivery';
import { StoreAppProvider } from '../../../app/Context/Context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DeliveryTrackPage from '../../../app/pages/DeliveryTrack.page';
import { DeliveryResponseMock } from '../../__mocks__/delivery.mock';
const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUsedNavigate,
}));

jest.mock('../../../app/hooks/useDelivery', () => ({
    useGetDeliveryStatus: jest.fn(),
}));


let queryClient = new QueryClient();
describe('DeliveryTrack Page', () => {
    it('shouldrender the delivery track page', async () => {
        (useGetDeliveryStatus as jest.MockedFunction<any>).mockReturnValue({ data: DeliveryResponseMock });
        const { getByTestId } = render(
            <DeliveryTrackPage />
        );
        await waitFor(() => {
            expect(getByTestId('delivery-track-page')).toBeInTheDocument();
        });
    });
    it('should render the delivery track page branch', async () => {
        (useGetDeliveryStatus as jest.MockedFunction<any>).mockReturnValue({ isLoading: true });
        const { getByTestId } = render(
            <DeliveryTrackPage />
        );
        await waitFor(() => {
            expect(getByTestId('delivery-track-page-loading')).toBeInTheDocument();
        });
    });
    it('should render the delivery track page branch 2', async () => {
        (useGetDeliveryStatus as jest.MockedFunction<any>).mockReturnValue({ isError: true });
        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <StoreAppProvider>
                    <DeliveryTrackPage />
                </StoreAppProvider>
            </QueryClientProvider>,
        );
        await waitFor(() => {
            expect(getByTestId('delivery-track-page-error')).toBeInTheDocument();
        });
    });
}
)