export const PaymentResponseMock =  {
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