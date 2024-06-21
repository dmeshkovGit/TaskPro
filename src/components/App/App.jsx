import { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { refreshToken } from "../../redux/auth/operations.js";
import { RestrictedRoute } from "../Routes/RestrictedRoute";
import { Toaster } from "react-hot-toast";
import { PrivateRoute } from "../Routes/PrivateRoute";
import { refreshUser } from "../../redux/user/operations.js";

const WelcomePage = lazy(() => import("../../pages/WelcomePage/WelcomePage"));
const AuthPage = lazy(() => import("../../pages/AuthPage"));
const RegisterForm = lazy(() => import("../RegisterForm/RegisterForm"));
const LoginForm = lazy(() => import("../LoginForm/LoginForm"));
const HomePage = lazy(() => import("../../pages/HomePage"));
const BoardPage = lazy(() => import("../../pages/BoardPage"));
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <div>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" />} />
          <Route
            path="/welcome"
            element={
              <RestrictedRoute component={<WelcomePage />} redirectTo="/home" />
            }
          />
          <Route path="/auth" element={<AuthPage />}>
            <Route
              path="register"
              element={
                <RestrictedRoute
                  component={<RegisterForm />}
                  redirectTo="/home"
                />
              }
            />
            <Route
              path="login"
              element={
                <RestrictedRoute component={<LoginForm />} redirectTo="/home" />
              }
            />
          </Route>

          <Route
            path="/home"
            element={
              <PrivateRoute component={<HomePage />} redirectTo="/auth/login" />
            }
          />
          <Route
            path="/home/:boardName"
            element={
              <PrivateRoute component={<BoardPage />} redirectTo="/welcome" />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Toaster position="top-center" />
    </div>
  );
}
