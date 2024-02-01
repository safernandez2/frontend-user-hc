import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menu.css';
import Logo from '../images/logo.png';

const Navbar: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      closeMenu();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className={`hero-section ${isMenuOpen ? 'menu-open' : ''}`}>
      <nav className={`navbar ${isMenuOpen ? 'navbar-open' : ''}`}>
        <div className="data-container">
          <img className="Logo" src={Logo} alt="Logo" />
          {windowWidth <= 760 && (
            <div className="checkbtn" onClick={toggleMenu}>
              &#9776;
            </div>
          )}
          {windowWidth > 760 ? (
            <div className="menu-data">
              <Link to="/inicio">Inicio</Link>
              <Link to="/habitaciones">Habitaciones</Link>
              <Link to="/contactos">Contactos</Link>
            </div>
          ) : (
            isMenuOpen && (
              <div className="menu-data animate__animated animate__fadeInRight" onClick={closeMenu}>
                <Link to="/inicio" onClick={closeMenu}>
                  Inicio
                </Link>
                <Link to="/habitaciones" onClick={closeMenu}>
                  Habitaciones
                </Link>
                <Link to="/contactos" onClick={closeMenu}>
                  Contactos
                </Link>
              </div>
            )
          )}
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
