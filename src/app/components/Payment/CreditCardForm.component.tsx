import {
  Button,
  DrawerFooter,
  DrawerContent,
  Drawer,
  Input,
  DrawerBody,
  DrawerHeader,
  Form,
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@nextui-org/react";
import { useState } from "react";
import Cards, { Focused } from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useAppContext } from "../../hooks/useAppContext";
import { useNavigate } from "react-router-dom";
const CreditCardForm = (props: any) => {
  const { isOpen, onOpenChange } = props;
  const navigate = useNavigate();
  const { create_transaction_response, clearCart } = useAppContext();

  const [creditCard, setCreditCardData] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
    acceptanceToken: false,
    personalDataToken: false,
  });
  const [acceptanceTokens, setAcceptanceTokens] = useState({
    acceptanceToken: false,
    personalDataToken: false,
  });

  const handleInputChange = (evt: any) => {
    const { name, value } = evt.target;
    setCreditCardData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCheckboxChange = (evt: any) => {
    const { name } = evt.target;
    //@ts-ignore
    setAcceptanceTokens((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleInputFocus = (evt: any) => {
    setCreditCardData((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      backdrop={"blur"}
      hideCloseButton
    >
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold">Credit Card Details</h1>
            </DrawerHeader>
            <DrawerBody>
              <div>
                <Cards
                  number={creditCard.number}
                  expiry={creditCard.expiry}
                  cvc={creditCard.cvc}
                  name={creditCard.name}
                  focused={creditCard.focus as Focused}
                />
                <Form className="flex flex-col gap-2 mt-10">
                  <Input
                    type="number"
                    name="number"
                    placeholder="Card Number"
                    value={creditCard.number}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    maxLength={16}
                  />
                  <div className="flex flex-row gap-2">
                    <Input
                      type="text"
                      name="expiry"
                      placeholder="Valid Thru (MM/YY)"
                      value={creditCard.expiry}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      maxLength={4}
                    />
                    <Input
                      type={"password"}
                      name="cvc"
                      placeholder="CVC"
                      value={creditCard.cvc}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      maxLength={3}
                    />
                  </div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Name on card"
                    value={creditCard.name}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                </Form>
                <div className="mt-10">
                  <div>
                    <input
                      type="checkbox"
                      id="acceptanceToken"
                      name="acceptanceToken"
                      onChange={handleCheckboxChange}
                    />

                    <span> Acepto haber leido los reglamentos y la </span>
                    <a
                      href={
                        create_transaction_response.acceptanceToken.permalink
                      }
                      target="_blank"
                    >
                      <span className="font-bold">politica de seguridad</span>
                    </a>
                    <span> para hacer este pago</span>
                  </div>{" "}
                  <input
                    type="checkbox"
                    id="personalDataToken"
                    name="personalDataToken"
                    onChange={handleCheckboxChange}
                  />
                  <span> Acepto </span>
                  <a
                    href={
                      create_transaction_response.personalDataToken.permalink
                    }
                    target="_blank"
                  >
                    <span className="font-bold">
                      la autorizacion para la administracion de los datos
                      personales
                    </span>
                  </a>
                </div>
              </div>
            </DrawerBody>
            <DrawerFooter>
              <Popover placement="top">
                <PopoverTrigger>
                  <Button color="danger" variant="light">
                    Cancel Order
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  {(titleProps) => (
                    <div className="px-1 py-2">
                      <h3 className="text-small font-bold" {...titleProps}>
                        You can´t resume your transaction...
                      </h3>
                      <Button
                        color="danger"
                        variant="light"
                        onPress={() => {
                          clearCart()
                          navigate('/')
                          onClose();
                        }}
                      >
                        Conffirm{" "}
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
              <Button
                color="primary"
                onPress={onClose}
                isDisabled={
                  !(
                    acceptanceTokens.acceptanceToken &&
                    acceptanceTokens.personalDataToken
                  )
                }
              >
                Pay
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default CreditCardForm;
