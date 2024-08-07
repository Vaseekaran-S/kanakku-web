import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store"

import Home from "pages/home";
import Layout from "./layout";
import Login from "pages/registration/login";
import SignUp from "pages/registration/signup";
import ForgotPassword from "pages/registration/forgot-password";
import PageNotFound from "pages/notFound";
import ResetPassword from "pages/registration/reset-password";

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
