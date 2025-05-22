import { Suspense, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import { Register } from "./pages/RegisterPage/Register";
import LoginPage from "./pages/LoginPage/LoginPage";
import { Toaster } from "react-hot-toast";
import StatisticsPage from "./pages/StatisticsPage/StatisticsPage";
import CurrencyPage from "./pages/CurrencyPage/CurrencyPage";
import PrivateRoute from "./PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
/* import { selectIsRefreshing } from "./redux/auth/selectors";
import { refreshUser } from "./redux/auth/authOperations"; */
import { HashLoader } from "react-spinners";
import { setIsLoading } from "./redux/loaderSlice";
import { store } from "./redux/store";

function App() {
  // const isRefreshing = useSelector(selectIsRefreshing);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(refreshUser());
  // }, [dispatch]);

  // if (isRefreshing) return null;

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loader);

  useEffect(() => {
    const foo = async () => {
      dispatch(setIsLoading(true));
      console.log(store.getState().loader);

      try {
        await Promise.resolve("RESULT");
        console.log("isLoading state:", isLoading);
      } catch (error) {
        console.log(error.message);
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    foo();
  }, []);

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
      {isLoading && (
        <div className="loaderWrap">
          <HashLoader color="#24CCA7" size={60} />
        </div>
      )}
    </>
  );
}

export default App;
