export interface ICreateDelivery {
    address: string
    customerId: number
    transactionId: string
}

export interface IDeliveryResponse {

    address: string
    status: string
    customer:
    {
        id: string
        name: string
        email: string
        address: string
        phone: string
        legalNumber: string
        legalType: string
        createAt: string
        updateAt: string
    },
    transaction: {
        id: string
        reference: string
        total_amount: string
        base_fee: string
        delivery_fee: string
        status: string
        bankTransactionId: string
        createAt: string
        updateAt: string
    },
    id: string
    createAt: string
    updateAt: string
}
