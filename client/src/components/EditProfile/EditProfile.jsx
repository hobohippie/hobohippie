import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const EditAccountForm = () => {
    const { user } = useAuth(); // Assume user context contains current user info
    const [account, setAccount] = useState({
        email: '',
        username: '',
        password: ''
    });

    // Load current user data into form when component mounts
    useEffect(() => {
        if (user && user.account) {
            setAccount({
                email: user.account.email,
                username: user.account.name,
                password: '' // Password is kept empty for security; user will need to re-enter it if they want to change it
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAccount(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateAccount();
    };

    const updateAccount = () => {
        axios.put('https://hobohippie.com/api/update-account', account, {
            withCredentials: true,
        })
        .then(response => {
            if (response.data === 'e-mail error') {
                document.querySelector('.feedback').innerHTML = "E-mail is already in use!";
            } else {
                document.querySelector('.feedback').innerHTML = "Profile updated successfully!";
            }
        })
        .catch(error => {
            console.error("There was an error with the request", error);
            document.querySelector('.feedback').innerHTML = "Something went wrong. Please try again later.";
        });
    };

    return (
        <Form onSubmit={handleSubmit} className="mb-5">
            <Form.Group>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                    className="my-2"
                    type="text"
                    name="name"
                    required={true}
                    value={account.username || ""}
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
                    required={true}
                    value={account.email || ""}
                    onChange={handleChange}
                />
                <Form.Label>Password (leave blank to keep current):</Form.Label>
                <Form.Control
                    className="my-2"
                    type="password"
                    name="password"
                    value={account.password || ""}
                    onChange={handleChange}
                />
            </Form.Group>
            <h2 className="feedback"></h2>
            <Button variant="primary" type="submit">Update</Button>
        </Form>
    );
};

export default EditAccountForm;