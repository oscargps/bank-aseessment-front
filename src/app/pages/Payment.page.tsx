import { Button, useDisclosure } from "@nextui-org/react";
import CartForPayment from "../components/Payment/CartForPayment.component";
import CreditCardForm from "../components/Payment/CreditCardForm.component";
import BackIcon from "../assets/Icons/BackIcon";
import { useNavigate } from "react-router-dom";
import { useCreateTransaction } from "../hooks/usePayment";
import { toast, Toaster } from "sonner";
import { useEffect } from "react";
import { CreateTransaction } from "../../modules/bank-store/bussiness/helpers/CreateTransaction.helper";
import { useAppContext } from "../hooks/useAppContext";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { cart, saveTransactionResponse } = useAppContext();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate, isLoading, isError, isSuccess, data } =
    useCreateTransaction();

  const confirmOrder = () => {
    mutate(CreateTransaction(cart));
  };
  useEffect(() => {
    if (isSuccess) {
      saveTransactionResponse(data);
      onOpen();
    }
    if (isError) {
      toast.error("Error creating transaction. Try Later");
    }
  }, [isSuccess, isError, isSuccess, data]);

  return (
    <>
      <Toaster position="top-center" richColors />

      <div className="flex flex-row items-center p-5 justify-between w-1/2">
        <Button variant="light" color="primary" onPress={() => navigate(`/`)}>
          <BackIcon />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-center mt-10">Checkout</h1>
      </div>
      <div className="flex flex-col items-center gap-10 mt-10 h-screen px-5 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold">Cart</h1>
        <CartForPayment />

        <Button
          isLoading={isLoading}
          variant="bordered"
          color="success"
          size="lg"
          onPress={confirmOrder}
        >
          {isLoading ? "Creating transaction" : "Confirm order"}
        </Button>
      </div>
      <CreditCardForm isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default PaymentPage;
