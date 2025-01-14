import { CreateTransaction } from "../../../modules/bank-store/bussiness/helpers/CreateTransaction.helper";
import { IProductCart } from "../../../modules/bank-store/domain/models/IProduct";
import { ITransaction } from "../../../modules/bank-store/domain/models/Itransaction";
import { ProductsMock } from "../../__mocks__/products.mock";

describe('CreateTransaction', () => {

    it('should handle an empty cart', () => {
        const cart: IProductCart[] = [];

        const transaction: ITransaction = CreateTransaction(cart);

        expect(transaction.totalAmount).toBe(0);
        expect(transaction.baseFee).toBe(0);
        expect(transaction.deliveryFee).toBe(0);
        expect(transaction.products).toEqual([]);
    });

    it('should map products correctly', () => {
        const cart: IProductCart[] = ProductsMock.map(productMock => ({ ...productMock, quantity: 1 }));


        const transaction: ITransaction = CreateTransaction(cart);

        expect(transaction.products).toEqual(ProductsMock.map(productMock => ({ productId: productMock.id, quantity: 1 })));
    });

});
