export const DeliveryResponseMock = {
    address: "123 Main Street, Springfield",
    status: "Pending",
    customer: {
        id: 101,
        name: "John Doe",
        email: "john.doe@example.com",
        address: "123 Main Street, Springfield",
        phone: "+1-555-1234",
        legalNumber: "987654321",
        legalType: "LLC",
        createAt: "2024-01-10T10:30:00Z",
        updateAt: "2024-01-12T14:45:00Z"
    },
    transaction: {
        id: 202,
        reference: "TXN-12345-ABCDE",
        total_amount: 150000,
        base_fee: 5000,
        delivery_fee: 10000,
        status: "Processing",
        bankTransactionId: "BANK1234567890",
        createAt: "2024-01-11T09:20:00Z",
        updateAt: "2024-01-12T14:00:00Z"
    },
    id: 303,
    createAt: "2024-01-11T09:00:00Z",
    updateAt: "2024-01-12T14:30:00Z"
};
