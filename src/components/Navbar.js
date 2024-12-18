import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

const Navbar = () => {
    const { user, logoutUser } = useContext(UserContext);

    const handleLogout = (event) => {
        event.preventDefault();
        logoutUser();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Blog App</a>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    {user ? (
                        <li className="nav-item">
                            <a className="nav-link" href="/" onClick={handleLogout}>Logout</a>
                        </li>
                    ) : (
                        <>
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/register">Register</a>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
