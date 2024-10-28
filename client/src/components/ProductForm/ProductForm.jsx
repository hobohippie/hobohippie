import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import { API_ROUTES } from '../../apiConfig';
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
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [feedback, setFeedback] = useState(''); // Added feedback state

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get(API_ROUTES.GET_ALL_SUPPLIERS);
                setSuppliers(response.data);
            } catch (error) {
                console.error("Error fetching suppliers:", error.message);
            }
        };

        const fetchTags = async () => {
            try {
                const response = await axios.get(API_ROUTES.GET_ALL_TAGS);
                setTags(response.data);
            } catch (error) {
                console.error("Error fetching tags:", error.message);
            }
        };

        fetchSuppliers();
        fetchTags();
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
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setImagePreview('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct();
    };

    const addProduct = async () => {
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
        formData.append('featured', product.featured);
        formData.append('discount[percentage]', product.discount.percentage);
        formData.append('discount[startDate]', product.discount.startDate);
        formData.append('discount[endDate]', product.discount.endDate);
        if (imageFile) {
            formData.append('image', imageFile);
        }
        try {
            const response = await axios.post(API_ROUTES.CREATE_PRODUCT, formData, {
                withCredentials: true
            });
            console.log("Product created:", response.data);
            setFeedback("Product created successfully!");
        } catch (error) {
            console.error("Error creating product:", error.message);
            setFeedback("Error creating product. Please try again.");
        }
    };

    const handleAddTag = async () => {
        if (newTag) {
            try {
                const response = await axios.post(API_ROUTES.CREATE_TAG, { name: newTag });
                setTags(prev => [...prev, response.data]);
                setProduct(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
                setNewTag('');
            } catch (error) {
                console.error("Error adding tag:", error.message);
            }
        }
    };

    const handleDeleteTag = async (tag) => {
        try {
            await axios.delete(`${API_ROUTES.DELETE_TAG}/${tag}`);
            setTags(prev => prev.filter(t => t !== tag));
            setProduct(prev => ({
                ...prev,
                tags: prev.tags.filter(t => t !== tag)
            }));
        } catch (error) {
            console.error("Error deleting tag:", error.message);
        }
    };

    const handleTagClick = (tag) => {
        if (!product.tags.includes(tag)) {
            setProduct(prev => ({
                ...prev,
                tags: [...prev.tags, tag]
            }));
        }
        console.log(product)
    };

    return (
        <Form onSubmit={handleSubmit} className="create-product-form">
            {feedback && <div className="feedback">{feedback}</div>} {/* Display feedback */}
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
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    name="description"
                    required
                    value={product.description}
                    onChange={handleChange}
                    className="form-input"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control
                    type="text"
                    name="category"
                    required
                    value={product.category}
                    onChange={handleChange}
                    className="form-input"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>SKU</Form.Label>
                <Form.Control
                    type="text"
                    name="sku"
                    required
                    value={product.sku}
                    onChange={handleChange}
                    className="form-input"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                    type="number"
                    name="price"
                    required
                    value={product.price}
                    onChange={handleChange}
                    className="form-input"
                />
            </Form.Group>

            {/* Inventory Details */}
            <Form.Group>
                <Form.Label>Inventory Quantity</Form.Label>
                <Form.Control
                    type="number"
                    name="inventory.quantity"
                    required
                    value={product.inventory.quantity}
                    onChange={handleChange}
                    className="form-input"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Restock Date</Form.Label>
                <Form.Control
                    type="date"
                    name="inventory.restockDate"
                    value={product.inventory.restockDate}
                    onChange={handleChange}
                    className="form-input"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Low Stock Threshold</Form.Label>
                <Form.Control
                    type="number"
                    name="inventory.lowStockThreshold"
                    value={product.inventory.lowStockThreshold}
                    onChange={handleChange}
                    className="form-input"
                />
            </Form.Group>

            {/* Supplier Selection */}
            <Form.Group>
                <Form.Label>Supplier</Form.Label>
                <Form.Control
                    as="select"
                    name="supplier"
                    value={product.supplier}
                    onChange={handleChange}
                    className="form-input"
                >
                    <option value="">Select a supplier</option>
                    {suppliers.map(supplier => (
                        <option key={supplier._id} value={supplier._id}>
                            {supplier.name}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            {/* Tags Management */}
            <Form.Group>
                <ListGroup>
                    {product.tags.map((tag, i) => (
                        <ListGroup.Item key={i} className="tag-display">
                            {tag}
                            <Button
                                onClick={() => handleDeleteTag(tag)}
                                className="tag-delete"
                                variant="danger"
                                size="sm"
                                style={{ marginLeft: '10px' }} // Styling for spacing
                            >
                                X
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <div>
                    <h5>Available Tags:</h5>
                    {tags.map((tag, i) => (
                        <Button
                            key={i}
                            onClick={() => handleTagClick(tag.name)}
                            className="tag-button"
                        >
                            {tag.name}
                        </Button>
                    ))}
                </div>
                <Form.Label>Tags</Form.Label>
                <Form.Control
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add new tag"
                    className="form-input"
                />
                <Button onClick={handleAddTag} className="add-tag-button" variant="success">
                    Add Tag
                </Button>
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

            {/* Discount Details */}
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
            <Form.Group>
                <Form.Label>Discount Start Date</Form.Label>
                <Form.Control
                    type="date"
                    name="discount.startDate"
                    value={product.discount.startDate}
                    onChange={handleChange}
                    className="form-input"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Discount End Date</Form.Label>
                <Form.Control
                    type="date"
                    name="discount.endDate"
                    value={product.discount.endDate}
                    onChange={handleChange}
                    className="form-input"
                />
            </Form.Group>

            {/* Featured Product Checkbox */}
            <Form.Group>
                <Form.Check
                    type="checkbox"
                    name="featured"
                    label="Featured Product"
                    checked={product.featured}
                    onChange={handleChange}
                />
            </Form.Group>

            <Button type="submit" variant="primary">Create Product</Button>
        </Form>
    );
};

export default CreateProductForm;
