import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "pages/home";
import Layout from "./layout";
import Login from "pages/login";
import SignUp from "pages/signup";
import ForgotPassword from "pages/forgotPass";
import PageNotFound from "pages/notFound";
import ResetPassword from "pages/resetPass";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
