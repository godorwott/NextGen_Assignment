// src/components/Header/Header.js
import React from "react";
import { FaUser } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import BgImage from "../assets/bg_image.png";
import Logo from "../assets/logo.png";

const Header = () => {
  return (
    <div className="header-container">
      <div className="container header">
        <div className="logo">
          <img src={Logo} />
        </div>
        <div className="menus d-xl-flex d-none">
          <span>Home</span>
          <span>Shop</span>
          <span>About</span>
          <span>Contact</span>
        </div>
        <div className="icons">
          <FaUser />
          <FaMagnifyingGlass />
          <CiHeart />
          <CiShoppingCart />
        </div>
      </div>

      <div className="image-container">
        <img src={BgImage} />
        <div className="centered">
          <span className="title">SHOP</span>
          <span className="next">Home {" > "} Shop</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
