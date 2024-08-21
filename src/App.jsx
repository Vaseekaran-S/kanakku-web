import { useEffect, useCallback, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setAuthentication, setUserData, setUserMail } from "redux-store/user/userSlice";

import { getUser } from "api/user";
import { verifyToken } from "api/registration";

import Layout from "./layout";

import Home from "pages/home";
import Login from "pages/registration/login";
import SignUp from "pages/registration/signup";
import ForgotPassword from "pages/registration/forgot-password";
import PageNotFound from "pages/notFound";
import ResetPassword from "pages/registration/reset-password";
import EmailVerification from "pages/registration/verify-email";

import Transactions from "pages/transactions";
import Events from "pages/events";
import Groups from "pages/groups";
import Profile from "pages/profile";
import Accounts from "pages/accounts";
import CreateAccount from "pages/accounts/create";
import Loader from "components/loader";
import Welcome from "pages/registration/welcome";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((store) => store.user.isAuthenticated);

  const checkAuthentication = useCallback(async () => {
    const token = localStorage.getItem("kanakku-user-token");
    const { isTokenValid, userMail } = await verifyToken(token);
    if (isTokenValid) {
      dispatch(setUserMail(userMail));
      const userData = await getUser(userMail);
      dispatch(setAuthentication(isTokenValid));
      dispatch(setUserData(userData));
    }
  }, [dispatch]);

  useEffect(() => {
    checkAuthentication();
  }, [isAuthenticated, checkAuthentication]);

  return (
    <BrowserRouter basename="/">
      <Suspense fallback={<Loader />}>
        <Layout>
          <Routes>
            {isAuthenticated ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/accounts/create" element={<CreateAccount />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/events" element={<Events />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="/profile" element={<Profile />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </>
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