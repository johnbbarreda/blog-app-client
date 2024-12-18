import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserContext from './context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

const UserProviderWrapper = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Here, you might want to validate the token or fetch user details
            setUser({ token }); // Simple example using token directly
        }
    }, []);

    const logoutUser = () => {
        localStorage.removeItem('token'); // Remove token from storage
        setUser(null); // Clear user from state
    };

    return (
        <UserContext.Provider value={{ user, setUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};

root.render(
    <React.StrictMode>
        <UserProviderWrapper>
            <App />
        </UserProviderWrapper>
    </React.StrictMode>
);
