import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "../pages/Products.page";
import CheckoutPage from "../pages/Checkout.page";
import PaymentPage from "../pages/Payment.page";
import DeliveryPage from "../pages/Delivery.page";
import DeliveryTrackPage from "../pages/DeliveryTrack.page";


export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/delivery/:reference" element={<DeliveryTrackPage />} />
      </Routes>
    </BrowserRouter>
  );
}
