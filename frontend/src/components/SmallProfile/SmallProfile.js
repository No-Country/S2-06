import "./SmallProfile.css"
import portrait from "../../assets/portrait.svg"
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function SmallProfile(props) {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
function OnClickCloseNavigate(url){
    navigate(url);
    setIsOpen(false)
}


    return ( 
        <div className="SmallProfile">
             <div className={isOpen?"SmallProfile--Nav openNav":" SmallProfile--Nav"}>
                <h3 className="SmallProfile--exit" onClick={()=>setIsOpen(false)}>X</h3>
                <img src={portrait} className="SmallProfile--nav--icon"/>
                <p className="SmallProfile--name">{props?.name}</p>
                <p className="SmallProfile--email">{props?.email}</p>
                {props.name? <button className="SmallProfile--buttons" onClick={()=>OnClickCloseNavigate("/private/profile")}>Profile</button>:""}
                {props.name?<button className="SmallProfile--buttons" onClick={()=>OnClickCloseNavigate("/private")}>Your Library</button>:<button className="SmallProfile--signOut" onClick={()=>OnClickCloseNavigate("/register")}>Register</button>}
                {props.name?<button className="SmallProfile--signOut">Sign Out</button>:<button className="SmallProfile--signOut" onClick={()=>navigate("/login")}>Sign In</button>}
            </div>
            <img src={portrait} className="SmallProfile--icon" onClick={()=>setIsOpen(!isOpen)}/>
           
        </div>
     );
}

export default SmallProfile;