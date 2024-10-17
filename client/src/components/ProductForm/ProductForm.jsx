import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './productForm.css'

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
        images: [], // Adjusted to handle URLs and alt text
        tags: [],
        featured: false,
        discount: {
            percentage: '',
            startDate: '',
            endDate: ''
        }
    });
    const [suppliers, setSuppliers] = useState([]);

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
            // Handle nested fields like 'inventory.quantity'
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

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setProduct((prevValues) => ({ ...prevValues, images: [...prevValues.images, ...files] }));
    };

    const removeImageField = (index) => {
        const newImages = [...product.images];
        newImages.splice(index, 1);
        setProduct((prevValues) => ({ ...prevValues, images: newImages }));
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

        product.images.forEach((image, idx) => {
            formData.append(`images[${idx}][url]`, image.url);
            formData.append(`images[${idx}][altText]`, image.altText || '');
        });

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
        <Form onSubmit={handleSubmit}>
            {/* Product Details */}
            <Form.Group>
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text" name="name" required value={product.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" name="description" required value={product.description} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" name="category" required value={product.category} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>SKU</Form.Label>
                <Form.Control type="text" name="sku" required value={product.sku} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" name="price" required value={product.price} onChange={handleChange} />
            </Form.Group>

            {/* Inventory Details */}
            <Form.Group>
                <Form.Label>Inventory Quantity</Form.Label>
                <Form.Control type="number" name="inventory.quantity" required value={product.inventory.quantity} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Restock Date</Form.Label>
                <Form.Control type="date" name="inventory.restockDate" value={product.inventory.restockDate} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Low Stock Threshold</Form.Label>
                <Form.Control type="number" name="inventory.lowStockThreshold" value={product.inventory.lowStockThreshold} onChange={handleChange} />
            </Form.Group>

            {/* Supplier */}
            <Form.Group>
                <Form.Label>Supplier</Form.Label>
                <Form.Control as="select" name="supplier" required value={product.supplier} onChange={handleChange}>
                    <option value="">Select a supplier</option>
                    {suppliers.map(supplier => (
                        <option key={supplier._id} value={supplier._id}>
                            {supplier.name}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            {/* Images */}
            <Form.Group>
                <Form.Label>Images</Form.Label>
                <Form.Control type="file" multiple accept="image/*" onChange={handleFileChange} />
                {product.images.length > 0 && product.images.map((image, index) => (
                    <div key={index}>
                        <span>{image.name}</span>
                        <Button variant="danger" onClick={() => removeImageField(index)}>Remove</Button>
                    </div>
                ))}
            </Form.Group>

            {/* Tags */}
            <Form.Group>
                <Form.Label>Tags (comma-separated)</Form.Label>
                <Form.Control type="text" name="tags" value={product.tags.join(', ')} onChange={handleChange} />
            </Form.Group>

            {/* Featured Product */}
            <Form.Group>
                <Form.Check type="checkbox" label="Featured Product" name="featured" checked={product.featured} onChange={(e) => setProduct(prev => ({ ...prev, featured: e.target.checked }))} />
            </Form.Group>

            {/* Discount */}
            <Form.Group>
                <Form.Label>Discount Percentage</Form.Label>
                <Form.Control type="number" name="discount.percentage" value={product.discount.percentage} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Discount Start Date</Form.Label>
                <Form.Control type="date" name="discount.startDate" value={product.discount.startDate} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Discount End Date</Form.Label>
                <Form.Control type="date" name="discount.endDate" value={product.discount.endDate} onChange={handleChange} />
            </Form.Group>
            
            <Button variant="primary" type="submit">Create Product</Button>
            <p id="backToProducts">
                Back to product list? <span><Link to="/products">View Products</Link></span>
            </p>
        </Form>
    );
};

export default CreateProductForm;
