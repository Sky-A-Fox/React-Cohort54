// src/components/Navbar.tsx
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  
  // Определяем, какая страница активна === Determine active page
  const getPageTitle = () => {
    if (location.pathname === '/favourites') {
      return 'Favourites';
    }
    return 'Products';
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <span className="nav-title">{getPageTitle()}</span>
      </div>
      <div className="nav-right">
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Products
        </NavLink>
        <NavLink 
          to="/favourites" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Favourites
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;