import { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import { Register } from "./pages/Register";

function App() {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/register" element={<Register />} />
          {/* <Route element={<PrivateRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/statistic" element={<Statistic />} />
            <Route path="/currency" element={<Currency />} />
          </Route> */}
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
