import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Home from "pages/home";
import Layout from "./layout";
import Login from "pages/registration/login";
import SignUp from "pages/registration/signup";
import ForgotPassword from "pages/registration/forgot-password";
import PageNotFound from "pages/notFound";
import ResetPassword from "pages/registration/reset-password";

import { verifyToken } from "api/registration";
import { setAuthentication } from "redux-store/user/userSlice";
import EmailVerification from "pages/registration/verify-email";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(store => store.user.isAuthenticated)

  const checkAuthentication = async () => {
    const isTokenValid = await verifyToken();
    dispatch(setAuthentication(isTokenValid))
  }

  useEffect(() => {
    checkAuthentication()
  }, [])

  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          {isAuthenticated ?
            <>
              <Route path="/" element={<Home />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </> :
            <>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </>
          }
          <Route path="/email-verification/:token" element={<EmailVerification />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
