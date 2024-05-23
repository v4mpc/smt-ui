import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Buy from "./pages/Buy.jsx";
import StockOnHand from "./pages/StockOnHand.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Sell from "./pages/Sell.jsx";
import Expense from "./pages/Expense.jsx";
import Reports from "./pages/Reports.jsx";
import StockAdjustment from "./pages/StockAdjustment.jsx";
import Unit from "./pages/Unit.jsx";
import Product from "./pages/Product.jsx";
import BuySuccess from "./pages/BuySuccess.jsx";
import ReportDesigner from "./pages/ReportDesigner.jsx";
import General from "./pages/General.jsx";
import Login from "./pages/Login.jsx";
import { AuthProvider } from "./Providers/AuthProvider.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="login" />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="sell" element={<Sell />} />
            <Route path="buy" element={<Buy />} />
            <Route path="tx-success" element={<BuySuccess />} />
            <Route path="expense" element={<Expense />} />
            <Route path="reports" element={<Reports />} />
            <Route path="stock-on-hand" element={<StockOnHand />} />
            <Route
              path="stock-on-hand/adjustment/:id"
              element={<StockAdjustment />}
            />
            <Route path="settings/units" element={<Unit />} />
            <Route path="settings/products" element={<Product />} />
            <Route path="settings/general" element={<General />} />
            <Route
              path="settings/report-designer"
              element={<ReportDesigner />}
            />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
