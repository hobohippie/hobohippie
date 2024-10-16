import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './productCard.css'; // Import the CSS for the product card

const ProductCard = ({ product }) => {
    // Use the first image if available, otherwise use a placeholder or default image
    const imageUrl = product.images.length > 0 ? product.images[0].url : '/path/to/default/image.jpg'; 

    return (
        <Link to={`/products/${product._id}`} className="product-card-link"> {/* Link to the product detail page */}
            <div className="product-card">
                <img src={imageUrl} alt={product.name} className="product-image" />
                <h4 className="product-name">{product.name}</h4> {/* Product name */}
                <p className="product-description">{product.description}</p> {/* Product description */}
                <p className="product-price">${product.price.toFixed(2)}</p>
                <div className="star-rating">
                    {/* Example star rating (replace with actual stars as needed) */}
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>☆</span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
