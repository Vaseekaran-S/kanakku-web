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
import { setAuthentication, setUserData } from "redux-store/user/userSlice";
import EmailVerification from "pages/registration/verify-email";
import Transactions from "pages/transactions";
import Events from "pages/events";
import Groups from "pages/groups";
import Profile from "pages/profile";
import Accounts from "pages/accounts";
import { getUser } from "api/user";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(store => store.user.isAuthenticated)

  const checkAuthentication = async () => {
    const isTokenValid = await verifyToken();
    dispatch(setAuthentication(isTokenValid));

    const userData = await getUser();
    dispatch(setUserData(userData))
  }

  useEffect(() => {
    checkAuthentication()
  }, [])

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {isAuthenticated ?
            <>
              <Route path="/" element={<Home />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/events" element={<Events />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/profile" element={<Profile />} />
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
      </Layout>
    </BrowserRouter>
  );
}

export default App;
