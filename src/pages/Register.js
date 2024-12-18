import React, { useState, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap'; 
import UserContext from '../context/UserContext'; 
import { Notyf } from 'notyf'; 
import 'notyf/notyf.min.css'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserContext); // Access setUser from context
    const navigate = useNavigate(); // Initialize navigate

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            const data = await response.json();
            console.log(data.message); // Handle success message
            
            navigate('/login'); // Redirect to login page after successful registration
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Register</h2>
            <Form onSubmit={handleRegister}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-3">
                    Register
                </Button>
            </Form>
        </Container>
    );
};

export default Register;
