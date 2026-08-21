import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import Account from "./pages/Account";
import Customize from "./pages/Customize";
import Story from "./pages/Story";
import Support from "./pages/Support";
import Legal from "./pages/Legal";
import Placeholder from "./pages/Placeholder";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="/shop" element={<Catalog />} />
        <Route path="/objects" element={<Catalog family="objects" />} />
        <Route path="/kits" element={<Catalog family="kits" />} />
        <Route path="/product/:slug" element={<Product />} />

        {/* legacy URLs from the MyNuki structure */}
        <Route path="/miniature" element={<Navigate to="/kits" replace />} />
        <Route path="/other" element={<Navigate to="/kits" replace />} />

        <Route path="/cart" element={<Cart />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderConfirmation />
            </ProtectedRoute>
          }
        />

        <Route path="/story" element={<Story />} />
        <Route path="/support" element={<Support />} />
        <Route path="/policies/:slug" element={<Legal />} />
        <Route path="/customize" element={<Customize />} />

        <Route path="/login" element={<Auth mode="login" />} />
        <Route path="/register" element={<Auth mode="register" />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Placeholder title="Page not found" />} />
      </Route>
    </Routes>
  );
}
