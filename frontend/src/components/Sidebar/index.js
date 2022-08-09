import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.svg";
import {ReactComponent as Store}  from "../../assets/icons/store.svg";
import {ReactComponent as Library} from "../../assets/icons/library.svg";
import {ReactComponent as Profile}  from "../../assets/icons/profile.svg";
import "./Sidebar.css";

const Sidebar = () => {
  
  const location = useLocation()
  const [isHomeSelected, setIsHomeSelected] = useState()
  useEffect(() => {
    setIsHomeSelected(location.pathname)
  }, [location.pathname])
  console.log(location.pathname)
  console.log(location.pathname.includes("private"))

  
  
  return (
    <>
      <nav className="sidebar">
        <div className="sidebar-Header">
          <img className="imageLogo" src={logo} alt="Imagenes Gama" />
          <h4 className="logo-header">Gama Games</h4>
        </div>

        <ul className="menuSidebar">
          <Link className="elements-sidebar" elements-sidebar to={"/"}>
            <li className="Sidebar--li">
              <div className="icon">
               <Store className="imagen-sidebar"/>
              </div>
              <h4 className="text-sidebar">Store</h4>
            </li>
          </Link>

          <Link className="elements-sidebar" elements-sidebar to={"/private"} >
            <li className={!(isHomeSelected?.includes("private/profile"))?"Sidebar--li selected": "Sidebar--li"}>
              <div className="icon">
                <Library className="imagen-sidebar"/>
              </div>
              <h4 className="text-sidebar">Library</h4>
            </li>
          </Link>

          <Link className="elements-sidebar" to={"/private/profile"} >
            <li className={(isHomeSelected?.includes("private/profile"))?"Sidebar--li selected": "Sidebar--li"}>
              <div className="icon">
                <Profile className="imagen-sidebar"/>
              </div>
              <h4 className="text-sidebar">Profile</h4>
            </li>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
