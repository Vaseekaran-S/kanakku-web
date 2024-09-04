import { useEffect, useCallback, useState, lazy, Suspense, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setAuthentication, setUserData, setUserMail } from "redux-store/user/userSlice";
import { getUser } from "api/user";
import { verifyToken } from "api/registration";

import Layout from "./layout";
import Loader, { PageLoader } from "components/loader";

// Lazy load pages
const Home = lazy(() => import("pages/home"));
const Login = lazy(() => import("pages/registration/login"));
const SignUp = lazy(() => import("pages/registration/signup"));
const ForgotPassword = lazy(() => import("pages/registration/forgot-password"));
const PageNotFound = lazy(() => import("pages/notFound"));
const ResetPassword = lazy(() => import("pages/registration/reset-password"));
const EmailVerification = lazy(() => import("pages/registration/verify-email"));
const Transactions = lazy(() => import("pages/transactions"));
const Events = lazy(() => import("pages/events"));
const Groups = lazy(() => import("pages/groups"));
const Profile = lazy(() => import("pages/profile"));
const Accounts = lazy(() => import("pages/accounts"));
const CreateAccount = lazy(() => import("pages/accounts/create"));
const Welcome = lazy(() => import("pages/registration/welcome"));

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useSelector((store) => store.user.isAuthenticated);

  const checkAuthentication = useCallback(async () => {
    try {
      const token = localStorage.getItem("kanakku-user-token");
      if (token) {
        const { isTokenValid, userMail } = await verifyToken(token);
        if (isTokenValid) {
          dispatch(setUserMail(userMail));
          const userData = await getUser(userMail);
          dispatch(setAuthentication(true));
          dispatch(setUserData(userData));
        }
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication, isAuthenticated]);

  const authenticatedRoutes = useMemo(
    () => (
      <>
        <Route path="/" element={<Home />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/accounts/create" element={<CreateAccount />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/events" element={<Events />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/profile" element={<Profile />} />
      </>
    ),
    []
  );

  const unauthenticatedRoutes = useMemo(
    () => (
      <>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </>
    ),
    []
  );

  return (
    <BrowserRouter basename="/">
      <Suspense fallback={<Loader />}>
        <Layout>
          <Routes>
            {isLoading ? (
              <Route path="*" element={<PageLoader />} />
            ) : isAuthenticated ? (
              authenticatedRoutes
            ) : (
              unauthenticatedRoutes
            )}
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/email-verification/:token" element={<EmailVerification />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;