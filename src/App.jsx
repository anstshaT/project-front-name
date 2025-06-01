import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
/* import { Register } from "./pages/RegisterPage/Register"; */
/* import LoginPage from "./pages/LoginPage/LoginPage"; */
import { Toaster } from "react-hot-toast";
import StatisticsPage from "./pages/StatisticsPage/StatisticsPage";
import CurrencyPage from "./pages/CurrencyPage/CurrencyPage";
import PrivateRoute from "./PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { refreshUser } from "./redux/auth/authOperations";
import { HashLoader } from "react-spinners";
import { setIsLoading } from "./redux/loaderSlice";
import { store } from "./redux/store";
import UserLayout from "./pages/UserLayout/UserLayout";
import RestrictedRoute from "./RectrictedRoute";
import { userInfo } from "./redux/user/userOperations";
/* import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"; */

const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage/Register"));
/* const HomePage = lazy(() => import("./pages/HomePage/HomePage")); */
/* const StatisticsPage = lazy(() =>
  import("./pages/StatisticsPage/StatisticsPage")
); */
/* const CurrencyPage = lazy(() => import("./pages/CurrencyPage/CurrencyPage")); */
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loader);
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
    const foo = async () => {
      dispatch(setIsLoading(true));

      try {
        await Promise.resolve("RESULT");
      } catch (error) {
        console.log(error.message);
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    foo();
  }, [dispatch]);

  // Виклик userInfo після оновлення користувача
  useEffect(() => {
    if (store.getState().auth.token) {
      dispatch(userInfo());
    }
  }, [dispatch]);

  return isRefreshing ? null : (
    <>
      <Suspense
        fallback={
          <div className="loaderWrap">
            <HashLoader color="#24CCA7" size={60} />
          </div>
        }
      >
        <Routes>
          <Route
            path="/login"
            element={
              <RestrictedRoute>
                <LoginPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute>
                <RegisterPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <UserLayout />
              </PrivateRoute>
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/statistic" element={<StatisticsPage />} />
            <Route path="/currency" element={<CurrencyPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
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
