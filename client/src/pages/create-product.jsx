import React from 'react';
import ProductForm from '../components/ProductForm/ProductForm';

const CreateProduct = () => {
    return (
        <div className="container">
            <h1 className="headerBlue">Add New Product</h1>
            <ProductForm />
        </div>
    );
};

export default CreateProduct;
