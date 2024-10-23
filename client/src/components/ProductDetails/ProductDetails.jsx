import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import Axios for API requests
import { useCart } from '../../context/CartContext'; // Adjust this path if necessary
import CartModal from '../CartModal/CartModal'; // Import the CartModal component
import './productDetails.css';

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const { addToCart, addToWishlist } = useCart(); // Destructure functions from context
  const [product, setProduct] = useState(null); // State to store product details
  const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility
  const [loading, setLoading] = useState(true); // State to control loading status

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`); // Fetch product by ID
        setProduct(response.data); // Set product data to state
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchProduct();
  }, [id]); // Run effect when ID changes

  // Function to handle closing the modal
  const handleClose = () => {
    setModalOpen(false); // Set modal visibility to false
  };

  const handleAddToCart = () => {
    addToCart(product); // Add product to cart
    setModalOpen(true); // Open the cart modal
  };

  if (loading) {
    return <h2>Loading...</h2>; // Show loading state
  }

  if (!product) {
    return <h2>Product not found</h2>; // Handle case where product does not exist
  }

  return (
    <div className="product-detail-container">
      <h1 className="product-title">{product.name}</h1>
      <img src={product.image} alt={product.name} className="product-image" />
      <p className="product-price">Price: ${product.price.toFixed(2)}</p>

      {product.discount.percentage > 0 && (
        <p className="product-discount">Discount: {product.discount.percentage}%</p>
      )}

      <p className="product-description">Description: {product.description}</p>
      <p className="product-quantity">Available Quantity: {product.inventory.quantity}</p>

      {product.tags && product.tags.length > 0 && (
        <p className="product-tags">Tags: {product.tags.join(', ')}</p>
      )}

      {product.reviews && product.reviews.length > 0 && (
        <div className="review-section">
          <h3 className="review-title">Reviews:</h3>
          {product.reviews.map(review => (
            <div key={review._id}>
              <p className="review-comment">Rating: {review.rating} - {review.comment}</p>
            </div>
          ))}
        </div>
      )}

      <button onClick={handleAddToCart} className={`product-button button-primary`}>Add to Cart</button>
      <button onClick={() => addToWishlist(product)} className={`product-button button-secondary`}>Add to Wishlist</button>

      <CartModal show={isModalOpen} onClose={handleClose} />
    </div>
  );
}

export default ProductDetail;
