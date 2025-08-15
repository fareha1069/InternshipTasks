import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-5">
      <div className="flex justify-between items-center h-25">

  {/* Logo */}
  <div className="flex items-center flex-shrink-0">
    <img
      src={logo}
      alt="Logo"
      className="w-30 h-30 rounded-full"
    />
    <span className="text-3xl font-bold tracking-wide ml-2">TextKeep</span>
  </div>

  {/* Desktop Menu */}
  <div className="hidden md:flex gap-10 flex-1 justify-center">
    <NavLink
      to="/"
      className={({ isActive }) =>
        `px-3 py-2 rounded transition ${isActive
          ? 'bg-gray-700 font-semibold text-xl'
          : 'text-xl hover:bg-gray-700'
        }`
      }
    >
      Home
    </NavLink>
    <NavLink
      to="/pastes"
      className={({ isActive }) =>
        `px-3 py-2 rounded transition ${isActive
          ? 'bg-gray-700 font-semibold text-xl'
          : 'text-xl hover:bg-gray-700'
        }`
      }
    >
      Pastes
    </NavLink>
  </div>

  {/* Mobile Menu Button */}
  <div className="md:hidden flex-shrink-0">
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="focus:outline-none"
    >
      {isOpen ? (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      )}
    </button>
  </div>
</div>

      </div>

      {/* Mobile Menu Links */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-3 space-y-2">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block hover:text-purple-400 transition ${isActive ? 'text-purple-500 font-semibold' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/pastes"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block hover:text-purple-400 transition ${isActive ? 'text-purple-500 font-semibold' : ''}`
            }
          >
            My Pastes
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
