import { Button, CircularProgress } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { useDoPayment, usePaymentDetail } from "../hooks/usePayment";
import { useAppContext } from "../hooks/useAppContext";
import CreatePaymentRequest from "../mappers/CreatePaymentRequest.mapper";
import PaymentResult from "../components/Payment/PaymentResult.component";
import { StorageHelper } from "../../modules/core/bussiness/helpers/storageHelper";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const AppContext = useAppContext();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState(false);
  const { data, isLoading, isError, isSuccess } = useDoPayment(
    CreatePaymentRequest(AppContext)
  );
  const PaymentDetail = usePaymentDetail(
    AppContext.create_transaction_response.reference
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success("Payment was successful.");
      PaymentDetail.refetch();
    }
    if (isError) {
      toast.error("There was an error creating in your payment.");
    }
  }, [isSuccess, isError, data]);

  useEffect(() => {
    if (
      (PaymentDetail.data?.data.status === "APPROVED" ||
        PaymentDetail.data?.data.status === "DECLINED") &&
      !paymentStatus
    ) {
      setPaymentStatus(true);
      StorageHelper.remove("Products");
    } else {
      setTimeout(() => {
        PaymentDetail.refetch();
      }, 3000);
    }
  }, [PaymentDetail.data]);

  return (
    <>
      <div className="flex flex-col items-center gap-10 mt-10" data-testid="payment-page">
        <h1 className="text-2xl font-bold text-center mt-10">Payment</h1>
        <Toaster position="top-center" richColors />

        {isLoading && <CircularProgress size="lg" label="Doing Payment....." />}
        {PaymentDetail.isFetching && (
          <CircularProgress size="lg" label="Checking Payment Status....." />
        )}
      </div>
      <PaymentResult
        status={PaymentDetail.data?.data.status || "PENDING"}
        reference={AppContext.create_transaction_response.reference}
        amount={PaymentDetail.data?.data.amount_in_cents || 0}
      />
      <div className="flex justify-center mt-10">
        {PaymentDetail.data?.data.status === "APPROVED" && (
          <Button
            color="primary"
            size="lg"
            onPress={() => {
              navigate("/delivery");
            }}
          >
            Go to Delivery
          </Button>
        )}
      </div>
    </>
  );
};

export default PaymentPage;
