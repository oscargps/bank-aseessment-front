import { Modal, ModalBody, ModalHeader } from "@nextui-org/react";
import { Button, ModalContent, ModalFooter } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext";
import CartItemSummary from "./CartItemSummary.component";
import { IProductCart } from "../../../modules/bank-store/domain/models/IProduct";
import numeral from 'numeral';

const CartSummaryModal = (props: any) => {
    const { isOpen, onOpenChange } = props;
    const { cart, removeFromCart } = useAppContext();
    const navigate = useNavigate()

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);


    return (
        <>
            <Modal isOpen={isOpen} size={'4xl'} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Carrito de compras</ModalHeader>
                            <ModalBody>
                                {cart.map((item: IProductCart) => (
                                    <CartItemSummary
                                        key={item.id}
                                        item={item}
                                        onRemove={removeFromCart}
                                    />
                                ))}

                                <div className="flex flex-col gap-2">
                                    <span className="text-lg font-bold">Total items: {totalItems}</span>
                                    <span className="text-lg font-bold">Total to pay: ${numeral(totalPrice).format('0,0')}</span>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={onClose}>
                                    Keep shopping
                                </Button>
                                <Button color="success" onPress={() => (navigate(`/payment`))}>
                                    Go to pay
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default CartSummaryModal;
