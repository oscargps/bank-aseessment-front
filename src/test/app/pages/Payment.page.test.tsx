import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useAppContext } from "../../../app/hooks/useAppContext";
import { StoreAppProvider } from "../../../app/Context/Context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PaymentPage from "../../../app/pages/Payment.page";
import { useDoPayment, usePaymentDetail } from "../../../app/hooks/usePayment";
import { PaymentResponseMock } from "../../__mocks__/payment.mock";
import { ProductsMock } from "../../__mocks__/products.mock";
const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));

jest.mock("../../../app/hooks/usePayment", () => ({
  useDoPayment: jest.fn(),
  usePaymentDetail: jest.fn(),
}));
jest.mock("../../../app/hooks/useAppContext", () => ({
  useAppContext: jest.fn(),
}));

let queryClient = new QueryClient();
describe("Payments Page", () => {
  it("should render the payments page", async () => {
    (useDoPayment as jest.MockedFunction<any>).mockReturnValue({
      data: PaymentResponseMock,
    });
    (usePaymentDetail as jest.MockedFunction<any>).mockReturnValue({
      data: PaymentResponseMock,
      refetch: jest.fn(),
    });
    (useAppContext as jest.MockedFunction<any>).mockReturnValue({
      cart: [],
      create_transaction_response: {
        reference: "1234",
        acceptanceToken: { acceptance_token: "1234" },
        personalDataToken: { acceptance_token: "1234" },
      },
      credit_card_data: {
        token_id: "1234",
        installments: 1,
      },
      addToCart: jest.fn(),
    });
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <StoreAppProvider>
          <PaymentPage />
        </StoreAppProvider>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(getByTestId("payment-page")).toBeInTheDocument();
    });
  });
  it("should render the payments page - branch", async () => {
    (useDoPayment as jest.MockedFunction<any>).mockReturnValue({
      data: PaymentResponseMock,
      isSuccess: true,
      isLoading: true,
    });
    (usePaymentDetail as jest.MockedFunction<any>).mockReturnValue({
      data: {
        ...PaymentResponseMock,
        data: { ...PaymentResponseMock, status: "APPROVED" },
      },
      isFetching : true,
      refetch: jest.fn(),
    });
    (useAppContext as jest.MockedFunction<any>).mockReturnValue({
      cart: ProductsMock.map(products => ({...products, quantity: 1})),
      create_transaction_response: {
        reference: "1234",
        acceptanceToken: { acceptance_token: "1234" },
        personalDataToken: { acceptance_token: "1234" },
      },
      credit_card_data: {
        token_id: "1234",
        installments: 1,
      },
      addToCart: jest.fn(),
    });
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <StoreAppProvider>
          <PaymentPage />
        </StoreAppProvider>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(getByTestId("payment-page")).toBeInTheDocument();
    });
  });
});
