import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './productForm.css';

const CreateProductForm = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        category: '',
        sku: '',
        price: '',
        inventory: {
            quantity: '',
            restockDate: '',
            lowStockThreshold: ''
        },
        supplier: '',
        tags: [],
        featured: false,
        discount: {
            percentage: '',
            startDate: '',
            endDate: ''
        }
    });

    const [suppliers, setSuppliers] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [availableTags, setAvailableTags] = useState(['Tag1', 'Tag2', 'Tag3']); // Predefined tags
    const [newTag, setNewTag] = useState('');

    useEffect(() => {
        axios.get('https://hobohippie.com/api/suppliers')
            .then(response => {
                setSuppliers(response.data);
            })
            .catch(error => {
                console.error("Error fetching suppliers:", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const nameParts = name.split('.');

        if (nameParts.length > 1) {
            setProduct((prevValues) => ({
                ...prevValues,
                [nameParts[0]]: {
                    ...prevValues[nameParts[0]],
                    [nameParts[1]]: value
                }
            }));
        } else if (name === 'tags') {
            setProduct((prevValues) => ({
                ...prevValues,
                tags: value.split(',').map(tag => tag.trim())
            }));
        } else {
            setProduct((prevValues) => ({ ...prevValues, [name]: value }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview('');
        }
    };

    const handleTagSelect = (tag) => {
        if (!product.tags.includes(tag)) {
            setProduct(prev => ({ ...prev, tags: [...prev.tags, tag] }));
        }
    };

    const handleAddTag = () => {
        if (newTag && !availableTags.includes(newTag)) {
            setAvailableTags(prev => [...prev, newTag.trim()]);
            setNewTag(''); // Clear the input field
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct();
    };

    const addProduct = () => {
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('category', product.category);
        formData.append('sku', product.sku);
        formData.append('price', product.price);
        formData.append('inventory[quantity]', product.inventory.quantity);
        formData.append('inventory[restockDate]', product.inventory.restockDate);
        formData.append('inventory[lowStockThreshold]', product.inventory.lowStockThreshold);
        formData.append('supplier', product.supplier);
        formData.append('tags', JSON.stringify(product.tags)); // Convert to JSON string
        formData.append('featured', product.featured);
        formData.append('discount[percentage]', product.discount.percentage);
        formData.append('discount[startDate]', product.discount.startDate);
        formData.append('discount[endDate]', product.discount.endDate);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        axios.post('https://hobohippie.com/api/create-product', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        })
        .then(response => {
            console.log("Product created:", response.data);
        })
        .catch(error => {
            console.error("Error creating product:", error);
            document.querySelector('.feedback').innerText = "Error creating product. Please try again.";
        });
    };

    return (
        <Form onSubmit={handleSubmit} className="create-product-form">
            {/* Product Details */}
            <Form.Group>
                <Form.Label>Product Name</Form.Label>
                <Form.Control 
                    type="text" 
                    name="name" 
                    required 
                    value={product.name} 
                    onChange={handleChange} 
                    className="form-input" 
                />
            </Form.Group>
            {/* Additional form fields go here... */}

            {/* Tags */}
            <Form.Group>
                <Form.Label>Tags</Form.Label>
                <div>
                    {availableTags.map((tag, index) => (
                        <Button 
                            key={index} 
                            variant="outline-secondary" 
                            className="tag-button" 
                            onClick={() => handleTagSelect(tag)}
                        >
                            {tag}
                        </Button>
                    ))}
                    <Form.Control 
                        type="text" 
                        value={newTag} 
                        onChange={(e) => setNewTag(e.target.value)} 
                        placeholder="Add a new tag" 
                        className="form-input" 
                    />
                    <Button 
                        variant="primary" 
                        onClick={handleAddTag} 
                        disabled={!newTag} // Disable if input is empty
                    >
                        Add Tag
                    </Button>
                </div>
            </Form.Group>

            {/* Image Upload */}
            <Form.Group>
                <Form.Label>Product Image</Form.Label>
                <Form.Control 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="form-input" 
                />
                {imagePreview && <img src={imagePreview} alt="Product Preview" className="image-preview" />}
            </Form.Group>

            {/* Featured Product */}
            <Form.Group>
                <Form.Check 
                    type="checkbox" 
                    label="Featured Product" 
                    name="featured" 
                    checked={product.featured} 
                    onChange={(e) => setProduct(prev => ({ ...prev, featured: e.target.checked }))} 
                />
            </Form.Group>

            {/* Discount */}
            <Form.Group>
                <Form.Label>Discount Percentage</Form.Label>
                <Form.Control 
                    type="number" 
                    name="discount.percentage" 
                    value={product.discount.percentage} 
                    onChange={handleChange} 
                    className="form-input" 
                />
            </Form.Group>

            <Button variant="primary" type="submit" className="submit-button">Create Product</Button>
            <p id="backToProducts">
                <Link to="/products">Back to Products</Link>
            </p>
            <div className="feedback"></div>
        </Form>
    );
};

export default CreateProductForm;
