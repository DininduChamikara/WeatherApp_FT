import React from "react";
import logo from "../images/logo.png";

function Header() {
  return (
    <div className="flex justify-center mb-20">
      <div className="flex gap-5">
        <img className="w-[56px] h-[46px]" src={logo} alt="logo"></img>
        <h1 className="text-white text-3xl">Weather App</h1>
      </div>
    </div>
  );
}

export default Header;
