import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import Layout from "./layout";
import Login from "./pages/login";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
