import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import Layout from "./layout";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
