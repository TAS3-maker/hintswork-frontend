import React, { useState } from "react";
import { Menu, X } from "lucide-react"; 
// import hintsLogo from "../assets/hintsLogo.png";
import logo from '../assets/logo.png';
import {Link} from 'react-scroll'
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="w-full px-5 md:px-10 lg:px-12 xl:px-16  md:bg-transparent z-50">
      <nav className="flex justify-between w-full p-2 items-center py-4 relative z-40 ">
        <div className="flex items-center  space-x-10">
          <img
            src={logo}
            alt="logo"
            className="h-20  w-auto object-contain"
          />
        </div>
        <ul className="hidden lg:flex xl:flex items-center gap-8 text-lg font-medium z-10">
          <li>
            <a href="#" className="text-red-500 hover:text-red-600">
              Home
            </a>
          </li>
          <li>
            <Link to="HIW" smooth={true} duration={800} className="hover:text-red-600 cursor-pointer">How It Works</Link>
          </li>
          <li>
            <Link to="Apps" className="hover:text-red-600 cursor-pointer">Apps</Link>
          </li>
          <li>
            <Link to="Science" smooth={true} duration={800} className="hover:text-red-600 z-50 cursor-pointer">Science</Link>
          </li>
          <li>
            <Link to="Awards" className="hover:text-red-600 cursor-pointer">Awards</Link>
          </li>
          <li>
            <Link to="Blog" className="hover:text-red-600 cursor-pointer">Blog</Link>
          </li>
          <li>
            <Link to="contactUs" smooth={true} duration={800} className="hover:text-red-600 cursor-pointer">Contact</Link>
          </li>
        </ul>
    
        <button
          className="lg:hidden xl:hidden p-2 rounded focus:outline-none z-50 relative"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={38} className="ml-10" />}
        </button>
      </nav>
      {isOpen && (
        <div className="lg:hidden xl:hidden bg-white px-6 pb-4 shadow-md  z-40 w-full relative">
          <ul className="flex flex-col gap-4 text-lg font-medium ">
            <li>
              <a href="#" className="text-red-500 ">Home</a>
            </li>

            <li>
            <Link to="HIW" smooth={true} duration={800} className="hover:text-red-600 cursor-pointer">How It Works</Link>
          </li>
          <li>
            <Link to="Apps" className="hover:text-red-600 cursor-pointer">Apps</Link>
          </li>
          <li>
            <Link to="Science" smooth={true} duration={800} className="hover:text-red-600 z-50 cursor-pointer">Science</Link>
          </li>
          <li>
            <Link to="Awards" className="hover:text-red-600 cursor-pointer">Awards</Link>
          </li>
          <li>
            <Link to="Blog" className="hover:text-red-600 cursor-pointer">Blog</Link>
          </li>
          <li>
            <Link to="contactUs" smooth={true} duration={800} className="hover:text-red-600 cursor-pointer">Contact</Link>
          </li>

          </ul>
        </div>
      )}
    </header>
  );
};
export default Header;