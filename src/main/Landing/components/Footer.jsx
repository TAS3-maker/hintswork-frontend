import React, { useState } from 'react';
import logo from '../assets/hintsLogo.png';
import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaPinterest,
  FaLinkedinIn,
  FaYoutube
} from 'react-icons/fa6';

const FooterSection = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full md:w-auto">
      
      <div
        className="md:hidden flex justify-between items-center py-3 border-b cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-bold text-xl">{title}</h3>
        <span className="text-xl">{isOpen ? '-' : '+'}</span>
      </div>

      <ul
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:block space-y-2 mt-2 md:mt-0 text-lg`}
      >
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="flex flex-col text-black">
      <div className="flex justify-center items-center w-full h-[120px] bg-white mb-5">
        <img src={logo} alt="HintsWork Logo" className="h-20" />
      </div>

      <div className="flex flex-col justify-between w-full bg-[#f5f2e1] px-6 py-8">
        <div className="grid md:grid-cols-4 gap-8 w-full max-w-6xl mx-auto">
          <FooterSection
            title="Company"
            items={['Home', 'Contact', 'Press', 'Careers', 'Brand Assets']}
          />
          <FooterSection
            title="Product"
            items={[
              'How It Works',
              'Apps',
              'Awards',
              'Pricing',
              'Reviews',
              'Blog',
              'FAQ'
            ]}
          />
          <FooterSection
            title="Science"
            items={[
              'Executive Summary',
              'Studies',
              'Experts',
              'Methods',
              'Responsible Use'
            ]}
          />
          <FooterSection
            title="Legal & Admin"
            items={[
              'Terms of Service',
              'Privacy Policy',
              'Cookie Policy',
              'Accessibility Statement',
              'Security',
              'DPA',
              'GDPR/CCPA Notice',
              'Medical Disclaimer',
              'Admin Login'
            ]}
          />
        </div>

        <div className="flex justify-center space-x-6 text-2xl mt-10">
          <FaXTwitter />
          <FaFacebookF />
          <FaInstagram />
          <FaPinterest />
          <FaLinkedinIn />
          <FaYoutube />
        </div>

        <div className="w-full border-t border-gray-400 my-6"></div>

        <div className="text-center text-base text-gray-700">
          © 2025 hints work
        </div>
      </div>
    </div>
  );
};

export default Footer;
