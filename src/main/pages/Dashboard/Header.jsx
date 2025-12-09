import React, { useState, useRef, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Profileimg from '../../assets/profile.png';

const Header = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  
  const adminInfo = {
    name: 'Hi Mike',
    email: 'mike123@gmail.com',
    avatar: 'https://www.w3schools.com/howto/img_avatar.png',
  };

  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  
  const handleLogout = () => {
    console.log('Logging out...');
    
  };

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  
  const handleOptionClick = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="header flex justify-between items-center px-5 py-3 md:py-6 bg-[#fffbef] text-black sticky top-0 z-20">
      
      <div className="lg:hidden">
        <div onClick={toggleSidebar} className="text-2xl text-[#786A08] cursor-pointer">
          <FaBars />
        </div>
      </div>

     
      <div
        className="header-right flex items-center flex-row-reverse ml-auto gap-2.5 relative"
        ref={dropdownRef}
      >
      
        <img
          src={Profileimg}
          alt="Admin Avatar"
          className="avatar size-12 md:size-16 rounded-full mr-0 md:mr-2.5 cursor-pointer"
          onClick={toggleDropdown}
        />

       
        <div className="admin-details text-end">
          <p className="m-0 text-[16px] font-bold">{adminInfo.name}</p>
          <p className="m-0 text-[14px]">{adminInfo.email}</p>
        </div>

       
        {isDropdownOpen && (
          <div className="dropdown-menu absolute w-full max-w-[400px] right-0 top-[100%] mt-2 bg-[#f8dd8a] shadow-lg rounded-lg z-30">
            <ul className="list-none flex flex-col gap-2 p-0 m-0">
              <li className=''>
                <Link
                  to="/dashboard/profile"
                  onClick={handleOptionClick} 
                  className="block px-4 py-3 hover:!bg-[#fffbef] !text-[#786A08] shadow-md rounded-t-lg"
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    handleLogout();
                    handleOptionClick(); 
                  }}
                  className="block w-full text-left px-4 py-3 shadow-md hover:!bg-[#fffbef] !text-[#786A08] rounded-b-lg"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
