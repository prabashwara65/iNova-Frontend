import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "./styles/theme";
import { CartProvider } from "./context/CartContext";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/order/customer/CartPage";
import TrackOrderPage from "./pages/order/customer/TrackOrderPage";
import SupportPage from "./pages/order/customer/SupportPage";
import AdminOrderDetailsPage from "./pages/order/admin/AdminOrderDetailsPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/track-order" element={<TrackOrderPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/admin/orders" element={<AdminOrderDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </CartProvider>
    </ThemeProvider>
  );
}
