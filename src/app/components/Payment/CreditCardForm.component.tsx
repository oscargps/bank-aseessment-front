import {
  Button,
  Checkbox,
  CheckboxGroup,
  DrawerFooter,
  DrawerContent,
  Drawer,
  Input,
  DrawerBody,
  DrawerHeader,
} from "@nextui-org/react";
import { useState } from "react";
import Cards, { Focused } from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
const CreditCardForm = (props:any) => {
  const { isOpen, onOpenChange } = props;
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (evt: any) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt: any) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">Credit Card Details</h1>
            </DrawerHeader>
            <DrawerBody>
              <div>
                <Cards
                  number={state.number}
                  expiry={state.expiry}
                  cvc={state.cvc}
                  name={state.name}
                  focused={state.focus as Focused}
                />
                <form className="flex flex-col gap-2 mt-10">
                  <Input
                    type="number"
                    name="number"
                    placeholder="Card Number"
                    value={state.number}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                  <div className="flex flex-row gap-2">
                    <Input
                      type="text"
                      name="expiry"
                      placeholder="Valid Thru (MM/YY)"
                      value={state.expiry}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                    />
                    <Input
                      type="number"
                      name="cvc"
                      placeholder="CVC"
                      value={state.cvc}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                    />
                  </div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Name on card"
                    value={state.name}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                </form>
                <div className="mt-10">
                  <CheckboxGroup defaultValue={[]}>
                    <Checkbox value="buenos-aires">
                      Acepto haber leido los reglamentos y la politica de
                      seguridad para hacer este pago
                    </Checkbox>
                    <Checkbox value="sydney">
                      Acepto la autorizacion para la administracion de los datos
                      personales
                    </Checkbox>
                  </CheckboxGroup>
                </div>
              </div>
            </DrawerBody>
            <DrawerFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel Order
              </Button>
              <Button color="primary" onPress={onClose}>
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
