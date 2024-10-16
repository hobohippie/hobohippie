import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import Axios for API requests
import { useCart } from '../../context/CartContext'; // Adjust this path if necessary
import CartModal from '../CartModal/CartModal'; // Import the CartModal component
import './productDetails.css'

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
    <div className="container">
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} className="img-fluid" />
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>Description: {product.description}</p> {/* Use product description if available */}
      <button onClick={handleAddToCart} className="btn btn-primary">Add to Cart</button>
      <button onClick={() => addToWishlist(product)} className="btn btn-secondary">Add to Wishlist</button>
      
      {/* Render CartModal and pass control to close it */}
      <CartModal show={isModalOpen} onClose={handleClose} />
    </div>
  );
};

export default ProductDetail;
