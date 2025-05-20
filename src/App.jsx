import { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import { Register } from "./pages/RegisterPage/Register";
import LoginPage from "./pages/LoginPage/LoginPage";
import { Toaster } from "react-hot-toast";
import StatisticsPage from "./pages/StatisticsPage/StatisticsPage";
import CurrencyPage from "./pages/CurrencyPage/CurrencyPage";

function App() {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/statistic" element={<StatisticsPage />} />
            <Route path="/currency" element={<CurrencyPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
