import "./App.css";

import { Register } from "./pages/RegisterPage/Register";

function App() {
  return (
    // <Register />
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/statistic" element={<Statistic />} />
            <Route path="/currency" element={<Currency />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
