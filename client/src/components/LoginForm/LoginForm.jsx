import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function LoginForm() {
    const [inputs, setInputs] = useState({});
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth(); 

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        await loginUser(inputs);
        setLoading(false);
    }

    const loginUser = async (credentials) => {
        try {
            const response = await axios.post('https://hobohippie.com/api/login', credentials);
            if (response.data) {
                const { account, token } = response.data; // Destructure account and token
                login(account, token); // Call the login function from AuthContext with user data and token
                setInputs({}); // Clear inputs on successful login
                navigate('/'); // Redirect to the homepage or dashboard
            } else {
                setFeedback("Invalid email or password!");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setFeedback(error.response.data.message || "Login failed. Please try again."); // Display specific error message if provided
            } else {
                setFeedback("Login failed. Please try again.");
            }
            console.error('Login error:', error);
        }
    };

    return (
        <>
            <hr />
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={inputs.email || ""}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={inputs.password || ""}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                {feedback && <Alert variant="danger">{feedback}</Alert>}
                <Button variant="primary" type="submit" className="m-3" disabled={loading}>
                    {loading ? "Logging In..." : "Log In"}
                </Button>
            </Form>
        </>
    );
}

export default LoginForm;
