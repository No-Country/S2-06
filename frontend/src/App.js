import "./App.css";

import {BrowserRouter, Route, Routes } from "react-router-dom"
import PublicRouter from "./routes/PublicRouter";
import PrivateRouter from "./routes/PrivateRouter";

function App() {
  return (
    <>
      <BrowserRouter >
          <Routes>
            <Route path="*" element= {<PublicRouter/>}/>
            <Route path="/private/*" element={<PrivateRouter />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
