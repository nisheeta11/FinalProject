import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import cartIcon from '../assets/carticon.svg';
import searchIcon from '../assets/searchicon.svg';
import { CartContext } from '../Context/CartContext';
import { AuthContext } from '../Context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import useSearchContext from '../Context/SearchContext';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    query,
    results,
    showDropdown,
    containerRef,
    handleInputChange,
    handleSearchClick,
    handleSelect,
    setShowDropdown,
  } = useSearchContext();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="navbar">
      <nav className="nav-container">
        <div className="logo">
          <NavLink to="/">
            <span className="brand-name">StudyVerse</span>
          </NavLink>
        </div>

        <div className="nav-links">
          {user?.role === 'admin' && (
            <NavLink to="/admin">
              <button className="btn admin">Admin Panel</button>
            </NavLink>
          )}

          {user?.role === 'tutor' && (
            <NavLink to="/dashboard">
              <button className="btn tutor">Tutor Dashboard</button>
            </NavLink>
          )}

          {user?.role === 'student' && (
            <>
              <div ref={containerRef} className="search-container">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    className="search-input"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={e => e.key === 'Enter' && handleSearchClick()}
                    onFocus={() => query.length >= 3 && results.length > 0 && setShowDropdown(true)}
                    autoComplete="off"
                  />
                  {showDropdown && (
                    <div className="search-dropdown">
                      {results.length ? (
                        results.map(course => (
                          <div
                            key={course.id}
                            className="dropdown-item"
                            onClick={() => handleSelect(course.id)}
                            tabIndex={0}
                            onKeyDown={e => e.key === 'Enter' && handleSelect(course.id)}
                          >
                            {course.title}
                          </div>
                        ))
                      ) : (
                        <div className="dropdown-item no-results">No matching courses found.</div>
                      )}
                    </div>
                  )}
                  <button
                    className="search-btn"
                    onClick={handleSearchClick}
                    aria-label="Search"
                    type="button"
                    disabled={query.trim().length < 3}
                  >
                    <img className="search-icon" src={searchIcon} alt="search icon" />
                  </button>
                </div>
              </div>

              <NavLink to="/addtocart" className="cart-wrapper">
                <img src={cartIcon} className="nav-cart-icon" alt="cart" />
                {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
              </NavLink>

              <button className="btn tutor" onClick={() => navigate('/teacher')}>
                For Tutor
              </button>
            </>
          )}

          {!user && (
            <NavLink to="/login">
              <button className="btn log-in">Get Started</button>
            </NavLink>
          )}

          {user && (
            <div className="profile-dropdown">
              <FaUserCircle className="profile-icon" />
              <div className="dropdown-menu">
                <p><strong>{user.name}</strong></p>
                <p className="email">{user.email}</p>
                <button
                  className="profile-btn"
                  onClick={() => navigate('/purchasedcourses')}
                >
                  My Courses
                </button>
                <button className="profile-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
