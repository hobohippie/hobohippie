import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';


const CreateAccountForm = () => {
    const [account, setAccount] = useState({
        email: '',
        password: '',
        username: ''
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAccount((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addAccount();
    };

    const addAccount = () => {
        axios.post('https://hobohippie.com/api/create-account', account, {
            withCredentials: true,
        })
        .then(response => {
            if (response.data === 'e-mail error') {
                document.querySelector('.feedback').innerHTML = "E-mail is already in use!";
                setAccount({ email: "", password: "", username: "" }); // Reset form
            } else {
                window.location = "/login";
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
                <Form.Label>User Name:</Form.Label>
                <Form.Control
                    className="my-2"
                    type="text"
                    name="username"
                    required
                    value={account.username}
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
            </Form.Group>
            <p id="alreadyMember">
                Already a member? <span><Link to="/login">Login Here</Link></span>
            </p>
            <Button variant="primary" type="submit">Join</Button>
        </Form>
    );
};

export default CreateAccountForm;
