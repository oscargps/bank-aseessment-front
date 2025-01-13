import { useEffect, useState } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { Alert, Button } from "@nextui-org/react";
import numeral from "numeral";
import { useCreateDelivery } from "../hooks/useDelivery";
import { toast, Toaster } from "sonner";
import { StorageHelper } from "../../modules/core/bussiness/helpers/storageHelper";

const DeliveryPage = () => {
    const [shippingAddress, setShippingAddress] = useState("");
    const [isAddressValid, setIsAddressValid] = useState(true);
    const [deliveryCreated, setDeliveryCreated] = useState(false);
    const { cart, create_transaction_response } = useAppContext();
    const { isError, isSuccess, isLoading, mutate } = useCreateDelivery()

    const subtotal = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const shipping = subtotal * 0.1;
    const total = subtotal + shipping;

    const handleConfirm = () => {
        if (shippingAddress.trim().length < 10) {
            setIsAddressValid(false);
            return;
        }
        setIsAddressValid(true);
        mutate({
            address: shippingAddress,
            customerId: 1,
            transactionId: create_transaction_response.reference
        });
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Delivery creates successfully.");
            setDeliveryCreated(true)
            StorageHelper.remove('cart')
        }
        if (isError) {
            toast.error("There was an error creating your delivery.");
        }
    }, [isSuccess, isError]);

    return (
        <>
            <Toaster position="top-center" richColors />

            <h1 className="text-2xl font-bold text-center mt-10">Payment</h1>

            <div className="max-w-4xl mx-auto p-4 space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center space-x-2 mb-4">
                        <h2 className="text-xl font-semibold">Order Items</h2>
                    </div>

                    <div className="divide-y">
                        {cart.map((product) => (
                            <div
                                key={product.id}
                                className="py-4 flex items-center space-x-4"
                            >
                                <img
                                    src={product.image || "/api/placeholder/80/80"}
                                    alt={product.name}
                                    className="w-20 h-20 object-cover rounded"
                                />
                                <div className="flex-1 space-y-1">
                                    <h3 className="font-medium">{product.name}</h3>
                                    <p className="text-sm text-gray-500">
                                        Quantity: {product.quantity}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">
                                        ${numeral(product.price * product.quantity).format("0,0")}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        ${numeral(product.price).format("0,0")} each
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center space-x-2 mb-4">
                        <h2 className="text-xl font-semibold">Shipping Information</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="address"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Delivery Address
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    type="text"
                                    id="address"
                                    value={shippingAddress}
                                    disabled={deliveryCreated}
                                    onChange={(e) => setShippingAddress(e.target.value)}
                                    className={`pl-10 block w-full rounded-md border ${isAddressValid ? "border-gray-300" : "border-red-500"
                                        } shadow-sm p-2.5 focus:border-blue-500 focus:ring-blue-500`}
                                    placeholder="Enter your complete shipping address"
                                />
                            </div>
                            {!isAddressValid && (
                                <p className="mt-1 text-sm text-red-600">
                                    Please enter a valid address (minimum 10 characters)
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span>${numeral(subtotal).format("0,0")}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Shipping</span>
                            <span>${numeral(shipping).format("0,0")}</span>
                        </div>
                        <div className="border-t pt-3">
                            <div className="flex justify-between font-semibold">
                                <span>Total</span>
                                <span>${numeral(total).format("0,0")}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button
                        isLoading={isLoading}
                        onPress={handleConfirm}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     transition-colors disabled:bg-gray-400"
                        isDisabled={!shippingAddress.trim() || deliveryCreated}
                    >
                        Confirm Order
                    </Button>
                </div>
                {deliveryCreated && (
                    <Alert
                        color={"success"}
                        title={"You can track your delivery here!"}
                        endContent={
                            <Button color="success" size="sm" variant="flat" onPress={() => { 
                                window.open(`${window.location.href}/${create_transaction_response.reference}`, '_blank') }}>
                                Track
                            </Button>
                        }
                    />
                )}
            </div>
        </>
    );
};

export default DeliveryPage;
