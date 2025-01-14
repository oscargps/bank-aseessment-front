import { ProductsMock } from "./products.mock"

export const PaymentResponseMock = {
  data: {
    id: 'test-id',
    created_at: 'test-created-at',
    amount_in_cents: 1000,
    status: "PENDING",
    reference: 'test-reference',
    customer_email: 'test-customer-email',
    currency: 'test-currency',
    payment_method_type: 'test-payment-method-type',
    payment_method: {
      type: 'test-payment-method-type',
      phone_number: 1234567890,
    },
    shipping_address: {
      address_line_1: 'test-address-line-1',
      country: 'test-country',
      region: 'test-region',
      city: 'test-city',
      phone_number: 1234567890,
    },
    redirect_url: 'test-redirect-url',
    payment_link_id: 'test-payment-link-id',
  },
}

export const mockPaymentData = {
  reference: " string",
  tokenId: "string",
  installments: 12,
  acceptanceToken: "string",
  personalDataToken: "string",
}

export const mockTransaction = {
  customerId: 1,
  totalAmount: 100000,
  baseFee: 10000,
  deliveryFee: 10000,
  products: ProductsMock.map(productMock => ({ productId: productMock.id, quantity: 1 })),
}

export const mockCreateTransactionResponse = {
  reference: "TXN-5678-ABCD",
  acceptanceToken: {
    acceptance_token: "acceptance-12345",
    permalink: "https://example.com/acceptance",
    type: "Acceptance Document"
  },
  personalDataToken: {
    acceptance_token: "personaldata-67890",
    permalink: "https://example.com/personal-data",
    type: "Personal Data Authorization"
  }
};

export const mockPaymentResponse = {
  data: {
    id: "pay-123456",
    created_at: "2025-01-14T12:00:00Z",
    amount_in_cents: 150000,
    reference: "ORDER-7890",
    customer_email: "customer@example.com",
    currency: "USD",
    payment_method_type: "credit_card",
    payment_method: {
      type: "VISA",
      installments: 3,
      token: "tok-abcdef123456"
    },
    status: "approved",
    status_message: "Payment approved successfully",
    shipping_address: null,
    redirect_url: "https://example.com/redirect",
    payment_source_id: "src-987654",
    payment_link_id: "lnk-456789"
  },
  meta: {
    request_id: "req-123456789",
    server: "api-server-1"
  }
};

export const mockPaymentDataStatus = {
  data: {
    id: "pay-987654",
    created_at: "2025-01-14T15:30:00Z",
    amount_in_cents: 200000,
    status: "approved",
    reference: "ORDER-12345",
    customer_email: "jane.doe@example.com",
    currency: "USD",
    payment_method_type: "credit_card",
    payment_method: {
      type: "MasterCard",
      phone_number: 1234567890
    },
    shipping_address: {
      address_line_1: "789 Maple Street",
      country: "USA",
      region: "California",
      city: "Los Angeles",
      phone_number: 9876543210
    },
    redirect_url: "https://example.com/redirect",
    payment_link_id: "lnk-112233"
  }
};
