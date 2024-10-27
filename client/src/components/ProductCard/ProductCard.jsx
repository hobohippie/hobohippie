import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './productCard.css'; // Import the CSS for the product card

const ProductCard = ({ product }) => {
    const imageUrl = product.images && product.images.length > 0 
        ? product.images[0].url 
        : '/path/to/default/image.jpg'; 

    // Function to render star rating based on product rating
    const renderStars = (rating) => {
        const totalStars = 5; // Total number of stars
        const filledStars = Math.round(rating); // Round rating to the nearest star
        const stars = [];

        for (let i = 0; i < totalStars; i++) {
            stars.push(
                <span key={i} className={i < filledStars ? 'filled' : 'empty'}>
                    {i < filledStars ? '★' : '☆'}
                </span>
            );
        }

        return stars;
    };

    return (
        <Link to={`/products/${product._id}`} className="product-card-link">
            <div className="product-card">
                <img src={imageUrl} alt={product.name} className="product-image" />
                <h4 className="product-name">{product.name}</h4>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <div className="star-rating">
                    {renderStars(5)} 
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
