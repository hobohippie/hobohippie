import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import './productForm.css';

const CreateProductForm = () => {
    // ... (other state and useEffect as before)

    const [selectedTags, setSelectedTags] = useState([]);

    // ... (handleChange and other functions as before)

    const handleDeleteTags = () => {
        const deletePromises = selectedTags.map(tag => 
            axios.delete(`https://hobohippie.com/api/tags/${tag}`)
        );

        Promise.all(deletePromises)
            .then(() => {
                setTags(prev => prev.filter(t => !selectedTags.includes(t)));
                setProduct(prev => ({
                    ...prev,
                    tags: prev.tags.filter(t => !selectedTags.includes(t))
                }));
                setSelectedTags([]);
            })
            .catch(error => console.error("Error deleting tags:", error));
    };

    const handleTagCheckboxChange = (tag) => {
        setSelectedTags(prev => 
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    return (
        <Form onSubmit={handleSubmit} className="create-product-form">
            {/* ... (other form groups as before) */}

            {/* Tags Management */}
            <Form.Group>
                <Form.Label>Tags</Form.Label>
                <Form.Control
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add new tag"
                    className="form-input"
                />
                <Button type="button" onClick={handleAddTag}>Add Tag</Button>
                <ListGroup>
                    {product.tags.map((tag, i) => (
                        <ListGroup.Item key={i}>
                            <Form.Check
                                type="checkbox"
                                label={tag}
                                checked={selectedTags.includes(tag)}
                                onChange={() => handleTagCheckboxChange(tag)}
                            />
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <Button variant="danger" onClick={handleDeleteTags} disabled={selectedTags.length === 0}>
                    Delete Selected Tags
                </Button>
                <div>
                    <h5>Available Tags:</h5>
                    {tags.map((tag, i) => (
                        <Button
                            key={i}
                            onClick={() => handleTagClick(tag.name)}
                            className="tag-button"
                            style={{ margin: '5px' }}
                        >
                            {tag.name}
                        </Button>
                    ))}
                </div>
            </Form.Group>

            {/* ... (rest of the form) */}
        </Form>
    );
};

export default CreateProductForm;
