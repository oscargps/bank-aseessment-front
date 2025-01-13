import React from "react";
import { Alert } from "@nextui-org/react";
import numeral from "numeral";



interface PaymentResultProps {
    status: string;
    reference: string;
    amount: number;
}


const PaymentResult: React.FC<PaymentResultProps> = ({
    status,
    reference,
    amount,
}) => {

    return (
        <div className="max-w-md mx-auto p-6 space-y-6">
            <div className="flex flex-col items-center space-y-4">
                {status === "APPROVED" && (
                    <Alert
                        color={"success"}
                        title={"Payment Successfully Approved!"}
                    />
                )}
                {status === "DECLINED" && (
                    <Alert
                        color={"danger"}
                        title={`Payment Error`}
                        description="Please verify your card information and try again or use a different payment method."
                    />
                )}

                {status === "PENDING" && (
                    <Alert
                        color={"warning"}
                        title={`Payment in Process`}
                        description="Your payment is being processed. This might take a few minutes. You will be notified when the transaction is complete."
                    />
                )}
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">Amount</span>
                    <span className="text-lg font-semibold">
                        ${numeral(amount / 100).format('0,0')}
                    </span>
                </div>



                <div className="border-t pt-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Reference: </span>
                        <span className="font-mono">{reference}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentResult;
