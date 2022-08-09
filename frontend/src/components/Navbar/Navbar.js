import React, { useState } from "react"
import logo from "../../assets/logo.svg"
import portrait from "../../assets/portrait.svg"
import userIcon from "../../assets/icons/userIcon.svg"
import supportIcon from "../../assets/icons/supportIcon.svg"
import communityIcon from "../../assets/icons/communityIcon.svg"
import storeIcon from "../../assets/icons/storeIcon.svg"
import "./Navbar.css"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import SmallProfile from "../SmallProfile"

function Navbar() {
    const [isClosed, setIsClosed] = useState(true)
    const userEmail = useSelector((state) => state.email);
    const userName = useSelector((state) => state.userName);
    return ( 
    <>
    <div className="pusher"></div>
    <header className="Navbar">
            <div className={isClosed? "Navbar--hamburger__container": "Navbar--hamburger__container conOpen"} onClick={()=>setIsClosed(!isClosed)}><span className= "Navbar--hamburger" > </span></div>
            <nav className={isClosed?"Navbar--toggle":"Navbar--toggle navOpen"}>
                <div className="Navbar--userData">
                    <img className="Navbar--userHero" src={portrait} alt="Portrait Icon"/>
                    <p className="Navbar--userName">{userName}</p>
                    <p className="Navbar--userEmail">{userEmail}</p>
                </div>
                <ul className="Navbar--list">
                    <Link to={"/login"} onClick={()=>setIsClosed(!isClosed)}> <li > <img src={userIcon} alt="userIcon" />Login</li></Link>
                    <Link to={"/"} onClick={()=>setIsClosed(!isClosed)}><li onClick={()=>setIsClosed(!isClosed)}> <img src={supportIcon} alt="Store"/>Store</li></Link>
                    <li onClick={()=>setIsClosed(!isClosed)}> <img src={communityIcon} alt="Community Icon"/>Community</li>
                    <li onClick={()=>setIsClosed(!isClosed)}> <img src={storeIcon} alt="Support Icon"/>Support</li>
                </ul>
            </nav>
            <img src={logo} className="Navbar--logo" alt="Logo"/>
            <SmallProfile email={userEmail} name={userName}/>
    </header>
    </> );
}

export default Navbar;