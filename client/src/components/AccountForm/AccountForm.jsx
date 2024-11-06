import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateAccountForm = () => {
    const navigate = useNavigate();
    
    // State for account details
    const [account, setAccount] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        billingAddress: {
            line1: '',
            city: '',
            state: '',
            postal_code: '',
            country: ''
        },
        shippingAddress: {
            line1: '',
            city: '',
            state: '',
            postal_code: '',
            country: ''
        }
    });
    const [isShippingDifferent, setIsShippingDifferent] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Handle input changes for regular fields and nested address fields
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('.')) {
            const [addressType, field] = name.split('.');
            setAccount(prev => ({
                ...prev,
                [addressType]: { ...prev[addressType], [field]: value }
            }));
        } else {
            setAccount(prev => ({ ...prev, [name]: value }));

            // Update password mismatch check if password fields are changed
            if (name === 'password' || name === 'confirmPassword') {
                setPasswordMismatch(
                    name === 'password' ? value !== account.confirmPassword : account.password !== value
                );
            }
        }
    };

    // Handle checkbox to use same billing address as shipping
    const handleShippingCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setIsShippingDifferent(isChecked);
        setAccount(prev => ({
            ...prev,
            shippingAddress: isChecked
                ? { line1: '', city: '', state: '', postal_code: '', country: '' }
                : { ...prev.billingAddress }
        }));
    };

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check for password mismatch
        if (passwordMismatch) {
            alert("Passwords do not match. Please check your entries.");
            return;
        }

        // Clear previous error message
        setErrorMessage('');

        addAccount();
    };

    // Post form data to the server
    const addAccount = () => {
        axios.post('https://hobohippie.com/api/create-account', account, {
            withCredentials: true,
        })
        .then(response => {
            if (response.data === 'e-mail error') {
                setErrorMessage("E-mail is already in use!");
                resetForm();
            } else {
                navigate("/login");
            }
        })
        .catch(error => {
            console.error("There was an error with the request", error);
            setErrorMessage("Something went wrong. Please try again later.");
        });
    };

    // Reset form fields
    const resetForm = () => {
        setAccount({
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            billingAddress: { line1: '', city: '', state: '', postal_code: '', country: '' },
            shippingAddress: { line1: '', city: '', state: '', postal_code: '', country: '' }
        });
        setIsShippingDifferent(false);
    };

    return (
        <Form onSubmit={handleSubmit} className="mb-5">
            <Form.Group>
                <Form.Label>Full Name:</Form.Label>
                <Form.Control
                    className="my-2"
                    type="text"
                    name="name"
                    required
                    value={account.name}
                    onChange={handleChange}
                />
            </Form.Group>
            <hr />
            <Form.Group>
                <Form.Label>E-mail:</Form.Label>
                <Form.Control
                    className="my-2"
                    type="email"
                    name="email"
                    required
                    value={account.email}
                    onChange={handleChange}
                />
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    className="my-2"
                    type="password"
                    name="password"
                    required
                    value={account.password}
                    onChange={handleChange}
                />
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control
                    className="my-2"
                    type="password"
                    name="confirmPassword"
                    required
                    value={account.confirmPassword}
                    onChange={handleChange}
                />
                {passwordMismatch && (
                    <div className="text-danger">Passwords do not match!</div>
                )}
            </Form.Group>
            <hr />
            <h5>Billing Address</h5>
            <Form.Group>
                <Form.Label>Address Line 1:</Form.Label>
                <Form.Control
                    className="my-2"
                    type="text"
                    name="billingAddress.line1"
                    required
                    value={account.billingAddress.line1}
                    onChange={handleChange}
                />
                <Form.Label>City:</Form.Label>
                <Form.Control
                    className="my-2"
                    type="text"
                    name="billingAddress.city"
                    required
                    value={account.billingAddress.city}
                    onChange={handleChange}
                />
                <Form.Label>State:</Form.Label>
                <Form.Control
                    className="my-2"
                    type="text"
                    name="billingAddress.state"
                    required
                    value={account.billingAddress.state}
                    onChange={handleChange}
                />
                <Form.Label>Postal Code:</Form.Label>
                <Form.Control
                    className="my-2"
                    type="text"
                    name="billingAddress.postal_code"
                    required
                    value={account.billingAddress.postal_code}
                    onChange={handleChange}
                />
                <Form.Label>Country:</Form.Label>
                <Form.Control
                    className="my-2"
                    type="text"
                    name="billingAddress.country"
                    required
                    value={account.billingAddress.country}
                    onChange={handleChange}
                />
            </Form.Group>
            <hr />
            <Form.Group>
                <Form.Check
                    type="checkbox"
                    label="Shipping address is different from billing address"
                    checked={isShippingDifferent}
                    onChange={handleShippingCheckboxChange}
                />
            </Form.Group>
            {isShippingDifferent && (
                <>
                    <h5>Shipping Address</h5>
                    <Form.Group>
                        <Form.Label>Address Line 1:</Form.Label>
                        <Form.Control
                            className="my-2"
                            type="text"
                            name="shippingAddress.line1"
                            required
                            value={account.shippingAddress.line1}
                            onChange={handleChange}
                        />
                        <Form.Label>City:</Form.Label>
                        <Form.Control
                            className="my-2"
                            type="text"
                            name="shippingAddress.city"
                            required
                            value={account.shippingAddress.city}
                            onChange={handleChange}
                        />
                        <Form.Label>State:</Form.Label>
                        <Form.Control
                            className="my-2"
                            type="text"
                            name="shippingAddress.state"
                            required
                            value={account.shippingAddress.state}
                            onChange={handleChange}
                        />
                        <Form.Label>Postal Code:</Form.Label>
                        <Form.Control
                            className="my-2"
                            type="text"
                            name="shippingAddress.postal_code"
                            required
                            value={account.shippingAddress.postal_code}
                            onChange={handleChange}
                        />
                        <Form.Label>Country:</Form.Label>
                        <Form.Control
                            className="my-2"
                            type="text"
                            name="shippingAddress.country"
                            required
                            value={account.shippingAddress.country}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </>
            )}
            {errorMessage && <div className="feedback text-danger">{errorMessage}</div>}
            <p id="alreadyMember">
                Already a member? <span><Link to="/login">Login Here</Link></span>
            </p>
            <Button variant="primary" type="submit">Join</Button>
        </Form>
    );
};

export default CreateAccountForm;
