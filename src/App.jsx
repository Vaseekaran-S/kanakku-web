import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setAuthentication, setUserData } from "redux-store/user/userSlice";

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

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(store => store.user.isAuthenticated)

  const checkAuthentication = async () => {
    const isTokenValid = await verifyToken();
    if(isTokenValid){
      const userData = await getUser();
      dispatch(setAuthentication(isTokenValid));
      dispatch(setUserData(userData))
    } 
  }

  useEffect(() => {
    checkAuthentication()
  }, [isAuthenticated])

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {isAuthenticated ?
            <>
              <Route path="/" element={<Home />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/accounts/create" element={<CreateAccount />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/events" element={<Events />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </> :
            <>
              <Route path="/accounts/create" element={<CreateAccount />} />
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
