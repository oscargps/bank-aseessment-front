import { IProductCart } from "../../domain/models/IProduct";
import { ITransaction } from "../../domain/models/Itransaction";

export const CreateTransaction = (cart: IProductCart[]): ITransaction => {
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return {
    customerId: 1,
    totalAmount: totalPrice,
    baseFee: totalPrice * 0.19,
    deliveryFee: totalPrice * 0.1,
    products: cart.map((cartItem: IProductCart) => ({
      productId: cartItem.id,
      quantity: cartItem.quantity,
    })),
  };
};
