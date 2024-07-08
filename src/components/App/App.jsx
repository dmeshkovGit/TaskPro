import { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { refreshToken } from '../../redux/auth/operations.js';
import { RestrictedRoute } from '../Routes/RestrictedRoute';
import { Toaster } from 'react-hot-toast';
import { PrivateRoute } from '../Routes/PrivateRoute';
import { refreshUser } from '../../redux/user/operations.js';
import { selectIsError } from '../../redux/user/selectors.js';
import { handleLogOut } from '../../redux/auth/slice.js';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';
import { fetchBoards } from '../../redux/board/operations.js';
import { selectUser } from '../../redux/user/selectors.js';

const WelcomePage = lazy(() => import('../../pages/WelcomePage/WelcomePage'));
const AuthPage = lazy(() => import('../../pages/AuthPage'));
const RegisterForm = lazy(() => import('../RegisterForm/RegisterForm'));
const LoginForm = lazy(() => import('../LoginForm/LoginForm'));
const HomePage = lazy(() => import('../../pages/HomePage'));
const BoardPage = lazy(() => import('../../pages/BoardPage'));
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage'),
);

export default function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isUserError = useSelector(selectIsError);
  const currentTheme = useSelector(selectUser).theme;

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    document.body.classList.remove('dark', 'light', 'violet');
    document.body.classList.add(currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(refreshUser());
      dispatch(fetchBoards());
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (isUserError) {
      dispatch(handleLogOut());
    }
  }, [dispatch, isUserError]);

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
