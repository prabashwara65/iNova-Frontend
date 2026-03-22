import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "./styles/theme";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/order/CartPage";
import TrackOrderPage from "./pages/order/TrackOrderPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import AdminHomePage from "./pages/admin/AdminHomePage";
import ProfilePage from "./pages/profile/ProfilePage";

function getStoredUserRole() {
  try {
    const rawUser = localStorage.getItem("inova_user");
    if (!rawUser) return null;
    const parsed = JSON.parse(rawUser);
    return parsed?.role || null;
  } catch {
    return null;
  }
}

function HomeRoute() {
  const token = localStorage.getItem("inova_token");
  const role = getStoredUserRole();

  if (token && role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <HomePage />;
}

function AdminRoute() {
  const token = localStorage.getItem("inova_token");
  const role = getStoredUserRole();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <AdminHomePage />;
}

function ProfileRoute() {
  const token = localStorage.getItem("inova_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <ProfilePage />;
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/admin" element={<AdminRoute />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/track-order" element={<TrackOrderPage />} />
        <Route path="/profile" element={<ProfileRoute />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </ThemeProvider>
  );
}
