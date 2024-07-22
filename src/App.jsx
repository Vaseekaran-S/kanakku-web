import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "pages/home";
import Layout from "./layout";
import Login from "pages/login";
import SignUp from "pages/signup";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
