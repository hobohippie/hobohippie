import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const CreateSupplierForm = () => {
    const [supplier, setSupplier] = useState({
        name: '',
        email: '',
        phone: '',
        notes: '',
        lastOrderedDate: ''
    });
    const [feedback, setFeedback] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier((prevSupplier) => ({
            ...prevSupplier,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addSupplier();
    };

    const addSupplier = () => {
        axios.post('https://hobohippie.com/api/create-supplier', supplier, {
            withCredentials: true
        })
        .then(response => {
            if (response.data === 'supplier exists') {
                setFeedback('Supplier name already exists!');
                setSupplier({ name: '', email: '', phone: '', notes: '', lastOrderedDate: '' });
            } else {
                setFeedback('Supplier added successfully!');
                setSupplier({ name: '', email: '', phone: '', notes: '', lastOrderedDate: '' }); // Reset form
            }
        })
        .catch(error => {
            console.error('There was an error with the request', error);
            setFeedback('Something went wrong. Please try again later.');
        });
    };

    return (
        <Form onSubmit={handleSubmit} className="mb-5">
            <Form.Group>
                <Form.Label>Supplier Name:</Form.Label>
                <Form.Control
                    className="my-2"
                    type="text"
                    name="name"
                    required
                    value={supplier.name}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    className="my-2"
                    type="email"
                    name="email"
                    value={supplier.email}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Phone:</Form.Label>
                <Form.Control
                    className="my-2"
                    type="tel"
                    name="phone"
                    value={supplier.phone}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Notes:</Form.Label>
                <Form.Control
                    className="my-2"
                    as="textarea"
                    rows={3}
                    name="notes"
                    value={supplier.notes}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Last Ordered Date:</Form.Label>
                <Form.Control
                    className="my-2"
                    type="date"
                    name="lastOrderedDate"
                    value={supplier.lastOrderedDate}
                    onChange={handleChange}
                />
            </Form.Group>
            <h2 className="feedback">{feedback}</h2>
            <Button variant="primary" type="submit">Add Supplier</Button>
        </Form>
    );
};

export default CreateSupplierForm;
