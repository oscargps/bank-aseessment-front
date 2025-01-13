import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "../pages/Products.page";
import CheckoutPage from "../pages/Checkout.page";
import PaymentPage from "../pages/Payment.page";


export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </BrowserRouter>
  );
}
