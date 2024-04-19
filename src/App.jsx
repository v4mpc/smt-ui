import AppLayout from "./components/AppLayout.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Buy from "./pages/Buy.jsx";
import StockOnHand from "./pages/StockOnHand.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Sell from "./pages/Sell.jsx";
import Expense from "./pages/Expense.jsx";
import Reports from "./pages/Reports.jsx";
import StockAdjustment from "./pages/StockAdjustment.jsx";


export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="sell" element={<Sell />} />
            <Route path="buy" element={<Buy />} />
            <Route path="expense" element={<Expense />} />
            <Route path="reports" element={<Reports />} />
            <Route path="stock-on-hand" element={<StockOnHand />}/>

            <Route path="stock-on-hand/adjustment/:id" element={<StockAdjustment />} />

          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
