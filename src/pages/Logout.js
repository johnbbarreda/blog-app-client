import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import UserContext from '../context/UserContext';

const Logout = () => {
    const { logoutUser } = useContext(UserContext);
    const navigate = useNavigate(); 

    useEffect(() => {
        logoutUser();
        navigate('/login');
    }, [logoutUser, navigate]);

    return (
        <div className="container mt-4">
            <h2>Logging out...</h2>
        </div>
    );
};

export default Logout;
