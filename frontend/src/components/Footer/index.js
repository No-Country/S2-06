import React from "react";
import "./footer.css";
import logo from "../../assets/logo.svg";
import phone from "../../assets/icons/phone.svg";
import email from "../../assets/icons/email.svg";
import facebook from "../../assets/icons/facebook.svg";
import twiter from "../../assets/icons/twiter.svg";

const Footer = () => {
  return (
    <>
      <div className="container-footer">
        <div className="logo">
          <img className="image-footer" src={logo} alt="logo" />
        </div>
        <div className="contact-ourNetwork">
          <p className="title-footer">Contact</p>
          <div className="second-box">
            <img className="image-footer" src={phone} alt="phone" />
            <p className="title-footer">0341- 4961500</p>
          </div>
          <div className="second-box">
            <img className="image-footer" src={email} alt="email" />
            <p className="title-footer">gamagames@gama.is</p>
          </div>
        </div>
        <div className="contact-ourNetwork">
          <p className="title-footer">Our Network</p>
          <div className="second-box">
            <img className="image-footer" src={facebook} alt="facebook" />
            <p className="title-footer">Facebook</p>
          </div>
          <div className="second-box">
            <img className="image-footer" src={twiter} alt="twiter" />
            <p className="title-footer">Twitter</p>
          </div>
        </div>

        <div className="allrigth-footer">
          <p className="title-footer">2022 Gama Game Corporation. All rights reserved</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
