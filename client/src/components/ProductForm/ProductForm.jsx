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

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get(API_ROUTES.GET_ALL_SUPPLIERS);
                setSuppliers(response.data);
            } catch (error) {
                console.error("Error fetching suppliers:", error);
            }
        };

        const fetchTags = async () => {
            try {
                const response = await axios.get(API_ROUTES.GET_ALL_TAGS);
                setTags(response.data);
            } catch (error) {
                console.error("Error fetching tags:", error);
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
        formData.append('featured', product.featured);
        formData.append('discount[percentage]', product.discount.percentage);
        formData.append('discount[startDate]', product.discount.startDate);
        formData.append('discount[endDate]', product.discount.endDate);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        axios.post(API_ROUTES.CREATE_PRODUCT, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true
        })
            .then(response => {
                console.log("Product created:", response.data);
            })
            .catch(error => {
                console.error("Error creating product:", error);
                const feedbackElement = document.querySelector('.feedback');
                if (feedbackElement) {
                    feedbackElement.innerText = "Error creating product. Please try again.";
                }
            });
        }

        const handleAddTag = () => {
            if (newTag) {
                axios.post('/api/tags', { name: newTag })
                    .then(response => {
                        setTags(prev => [...prev, response.data]);
                        setProduct(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
                        setNewTag('');
                    })
                    .catch(error => console.error("Error adding tag:", error));
            }
        };

        const handleDeleteTag = (tag) => {
            axios.delete(`/api/tags/${tag}`)
                .then(() => {
                    setTags(prev => prev.filter(t => !tags.includes(t)));
                })
                .catch(error => console.error("Error deleting tags:", error));
        };

        const handleTagClick = (tag) => {
            if (!product.tags.includes(tag)) {
                setProduct(prev => ({
                    ...prev,
                    tags: [...prev.tags, tag]
                }));
            }
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
                            <option key={supplier.id} value={supplier.id}>
                                {supplier.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                {/* Tags Management */}
                <Form.Group>
                    <ListGroup>
                        {product.tags ? product.tags.map((tag, i) => (
                            <ListGroup.Item key={i} className="tag-display">
                                {tag}
                            </ListGroup.Item>
                        )) : ''}
                    </ListGroup>
                    <div>
                        <h5>Available Tags:</h5>
                        {tags ? tags.map((tag, i) => (
                            <>
                                <Button
                                    key={i}
                                    onClick={() => handleTagClick(tag.name)}
                                    className="tag-button"
                                >
                                    {tag.name}
                                </Button>
                                <Button
                                    onClick={() => handleDeleteTag(tag.name)}
                                    className="tag-delete">
                                    X
                                </Button>
                            </>
                        )) : ''}
                    </div>
                    <Form.Label>Tags</Form.Label>
                    <Form.Control
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add new tag"
                        className="form-input"
                    />
                    <Button type="button" onClick={handleAddTag}>Add Tag</Button>
                </Form.Group>


                {/* Featured Product */}
                <Form.Group>
                    <Form.Check
                        type="checkbox"
                        label="Featured Product"
                        checked={product.featured}
                        onChange={() => setProduct(prev => ({ ...prev, featured: !prev.featured }))}
                    />
                </Form.Group>

                {/* Image Upload */}
                <Form.Group>
                    <Form.Label>Product Image</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100px' }} />}
                </Form.Group>

                {/* Submit Button */}
                <Button type="submit">Create Product</Button>
                <div className="feedback"></div>
            </Form>
        );
    };

    export default CreateProductForm;
