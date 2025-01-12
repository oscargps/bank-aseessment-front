import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "../pages/Products.page";
import PaymentPage from "../pages/Payment.page";


export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </BrowserRouter>
  );
}
