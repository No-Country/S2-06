import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Confirmed from "../pages/Confirmed";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import UserLogin from "../pages/UserLogin";
import UserRegister from "../pages/UserRegister";
import NewPassword from "../pages/NewPassword";
import Footer from "../components/Footer";
import View from "../pages/View";
import Search from "../pages/Search";
import SearchBar from "../components/SearchBar";


function PublicRouter() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact match path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/confirmed/:token" element={<Confirmed />} />
        <Route path="/forgot/:token" element={<NewPassword />}></Route>

        <Route
          path="/"
          element={
            <>
              <SearchBar />
              <Home />
            </>
          }
        />
        <Route
          path="/games/:steamAppId"
          element={
            <>
              <SearchBar />
              <View />
            </>
          }
        ></Route>
        <Route
          path="/games"
          element={
            <>
              <SearchBar />
              <Search />
            </>
          }
        ></Route>
 
      </Routes>
      <Footer />
    </>
  );
}

export default PublicRouter;
