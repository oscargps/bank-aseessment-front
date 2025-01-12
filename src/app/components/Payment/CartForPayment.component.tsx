import { useAppContext } from "../../hooks/useAppContext";
import CartItemSummary from "../Cart/CartItemSummary.component";

const CartForPayment = () => {
    const { cart, removeFromCart } = useAppContext();
    return (
        <div>
            {cart.map((item) => (
                <CartItemSummary key={item.id} item={item} onRemove={removeFromCart} />
            ))}
        </div>
    )
}

export default CartForPayment;