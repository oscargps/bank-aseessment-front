import { useAppContext } from "../../hooks/useAppContext";
import CartItemSummary from "../Cart/CartItemSummary.component";
import numeral from "numeral";

const CartForPayment = () => {
    const { cart, removeFromCart } = useAppContext();
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const fee = totalPrice * 0.19
    const deliveryFee = totalPrice * 0.1

    return (
        <div>
            {cart.map((item) => (
                <CartItemSummary key={item.id} item={item} onRemove={removeFromCart} />
            ))}
            <div className="flex flex-col gap-2">
                <span className="text-lg font-bold">Total Products: ${numeral(totalPrice).format('0,0')}</span>
                <span className="text-lg font-bold">Base Fee (19%): ${numeral(fee).format('0,0')}</span>
                <span className="text-lg font-bold">Delivery Fee : ${numeral(deliveryFee).format('0,0')}</span>
                <span className="text-lg font-bold">Total to Pay : ${numeral(totalPrice + fee + deliveryFee).format('0,0')}</span>
            </div>
        </div>
    )
}

export default CartForPayment;