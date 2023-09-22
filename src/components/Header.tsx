import logo from "../images/logo.png";
import { appTitle } from "../constants";

function Header() {
  return (
    <div className="flex justify-center mb-20">
      <div className="flex gap-5">
        <img className="w-[56px] h-[46px]" src={logo} alt="logo"></img>
        <h1 className="text-white text-3xl">{appTitle}</h1>
      </div>
    </div>
  );
}

export default Header;
