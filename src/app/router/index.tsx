import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "../pages/Products.page";


export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}
