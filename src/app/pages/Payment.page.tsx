import { Button, useDisclosure } from "@nextui-org/react";
import CartForPayment from "../components/Payment/CartForPayment.component";
import CreditCardForm from "../components/Payment/CreditCardForm.component";
import BackIcon from "../assets/Icons/BackIcon";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
    const navigate = useNavigate()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const confirmOrder = () => {
        onOpen()
    }

    return (
        <>
            <div className="flex flex-row items-center p-5 justify-between w-1/2">
                <Button variant="light" color="primary" onPress={() => (navigate(`/`))}>
                    <BackIcon />
                    Back
                </Button>
                <h1 className="text-2xl font-bold text-center mt-10">Payment</h1>
            </div>
            <div className="flex flex-col items-center gap-10 mt-10 h-screen px-5 max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold">Cart</h1>
                <CartForPayment />
                <Button variant="bordered" color="success" size="lg" onPress={confirmOrder}>

                    Confirm order
                </Button>
            </div>
            <CreditCardForm isOpen={isOpen} onOpenChange={onOpenChange} />

        </>
    )
}

export default PaymentPage;