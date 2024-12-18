import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostDetail from './pages/PostDetail';
import Logout from './pages/Logout';
import EditPost from './components/EditPost'; 
import ErrorHandler from './components/ErrorHandler';

const App = () => {
    return (
        <ErrorHandler>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/posts/:id" element={<PostDetail />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/edit/:id" element={<EditPost />} />
                </Routes>
            </Router>
        </ErrorHandler>
    );
};

export default App;
