export interface ICreateDelivery {
    address: string
    customerId: number
    reference: string
}

export interface IDeliveryResponse {

    address: string
    status: string
    customer:
    {
        id: number
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
        id: number
        reference: string
        total_amount: number
        base_fee: number
        delivery_fee: number
        status: string
        bankTransactionId: string
        createAt: string
        updateAt: string
    },
    id: number
    createAt: string
    updateAt: string
}
