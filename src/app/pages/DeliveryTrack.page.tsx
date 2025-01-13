import React from "react";
import { useParams } from "react-router-dom";
import { IDeliveryResponse } from "../../modules/bank-store/domain/models/IDelivery";
import { Alert, Chip, CircularProgress } from "@nextui-org/react";
import { useGetDeliveryStatus } from "../hooks/useDelivery";
import numeral from "numeral";
enum statusStyles {
  PENDING = "warning",
  REJECTED = "danger",
  DELIVERED = "success",
}

const DeliveryTrackPage = () => {
  const { reference } = useParams();
  const [shippingData, setShippingData] =
    React.useState<IDeliveryResponse | null>(null);
  const { data, isLoading, isError } = useGetDeliveryStatus(reference || "");

  React.useEffect(() => {
    if (data) {
      setShippingData(data);
    }
  }, [isLoading, data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <CircularProgress size="lg" label="Checking Delivery Status....." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 p-4">
        <Alert color={"danger"} title={"Error getting your delivery!"} />
      </div>
    );
  }

  if (!shippingData) return null;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Shipping Status</h1>
            <p className="text-gray-600">
              Reference: {shippingData.transaction.reference}
            </p>
          </div>
          <Chip color={statusStyles[shippingData.status]}>
            {shippingData.status}
          </Chip>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold">Shipping Details</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div>
              <p className="font-medium">Delivery Address</p>
              <p className="text-gray-600">{shippingData.address}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div>
              <p className="font-medium">Order Date</p>
              <p className="text-gray-600">
                {new Date(shippingData.createAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold">Customer Information</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Name</p>
            <p className="font-medium">{shippingData.customer.name}</p>
          </div>
          <div>
            <p className="text-gray-600">Email</p>
            <p className="font-medium">{shippingData.customer.email}</p>
          </div>
          <div>
            <p className="text-gray-600">Phone</p>
            <p className="font-medium">{shippingData.customer.phone}</p>
          </div>
          <div>
            <p className="text-gray-600">ID</p>
            <p className="font-medium">
              {shippingData.customer.legalType}{" "}
              {shippingData.customer.legalNumber}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold">Transaction Details</h2>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Base Amount</span>
            <span className="font-medium">
              ${numeral(shippingData.transaction.total_amount).format("0,0")}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Delivery Fee</span>
            <span className="font-medium">
              ${numeral(shippingData.transaction.delivery_fee).format("0,0")}
            </span>
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between items-center font-semibold">
              <span>Total Amount</span>
              <span className="text-lg">
                $
                {numeral(
                  shippingData.transaction.total_amount +
                    shippingData.transaction.delivery_fee
                ).format("0,0")}
              </span>
            </div>
          </div>
          <div className="pt-2">
            <p className="text-sm text-gray-500">
              Bank Transaction ID: {shippingData.transaction.bankTransactionId}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTrackPage;
