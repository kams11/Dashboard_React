import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BellOutlined, UserOutlined  } from '@ant-design/icons';
import './Navbar.css'; 

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Breadcrumbs */}
                <div className="navbar-breadcrumb">
                    <Link to="/" className="navbar-link">Home</Link> &gt; <Link to="/dashboard" className="navbar-link">DashBoard V3</Link>
                </div>

                {/* Search Bar */}
                <div className="navbar-search">
                    <input type="text" placeholder="Search anything..." className="search-input" />
                </div>

                <div className="menu-icon" onClick={toggleNavbar}>
                    <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                        <Link to="/home" className="nav-links" onClick={toggleNavbar}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/profile" className="nav-links" onClick={toggleNavbar}>
                            Profile
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/settings" className="nav-links" onClick={toggleNavbar}>
                            Settings
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/logout" className="nav-links" onClick={toggleNavbar}>
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
