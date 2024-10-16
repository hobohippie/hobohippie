import React from 'react';
import { useCart } from '../context/CartContext'; // Import your CartContext

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, addToCart } = useCart(); // Use the hook to get wishlist items

  return (
    <div className="container">
      <h1>Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {wishlistItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        addToCart(item); // Add to Cart
                        removeFromWishlist(item.id); // Remove from Wishlist
                      }}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeFromWishlist(item.id)} // Remove from Wishlist
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Wishlist;