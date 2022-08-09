import { Route, Routes } from "react-router-dom";
//import Navbar from "../components/Navbar";
import PrivateHome from "../pages/Private/PrivateHome";
import PrivateProfile from "../pages/Private/PrivateProfile";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Error from "../pages/Error";

function PrivateRouter() {
  return (
    <>
      <Routes>
        <Route
          exact
          match
          path="/"
          element={
            <div className="container-privateHome">
              <Sidebar />
              <Navbar />
              <PrivateHome />
            </div>
          }
        />
        <Route
          exact
          match
          path="profile"
          element={
            <div className="container-privateHome">
              <Sidebar />
              <Navbar />
              <PrivateProfile />
            </div>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default PrivateRouter;
