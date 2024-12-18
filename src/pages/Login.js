import React, { useState, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap'; 
import UserContext from '../context/UserContext'; 
import { Notyf } from 'notyf'; 
import 'notyf/notyf.min.css'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserContext); // Access setUser from context
    const notyf = new Notyf(); // Initialize Notyf for notifications
    const navigate = useNavigate(); // Initialize navigate

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log('Login Response:', data); 

            if (response.ok) {
                localStorage.setItem('token', data.token); // Store only the token
                console.log('Token stored:', data.token);
                setUser({ token: data.token, email }); // Set user context with email and token
                notyf.success('Login successful!'); // Show success notification
                
                navigate('/'); // Redirect to home page after successful login
            } else {
                const errorMessage = data.message || 'Login failed'; 
                console.error('Login failed:', errorMessage);
                notyf.error(errorMessage); // Show error notification
            }
        } catch (error) {
            console.error('Error during login:', error);
            notyf.error('An error occurred while logging in.'); // Show general error notification
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleLogin}>
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
                    Login
                </Button>
            </Form>
        </Container>
    );
};

export default Login;
