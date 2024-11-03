import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';

import Header from './components/Header/Header';
import LoginBanner from './components/LoginBanner/LoginBanner'
import Footer from './components/Footer/Footer';
import Home from './pages/home';
import About from './pages/about';
import Products from './pages/products';
import Contact from './pages/contact';
import UserProfile from './pages/user-profile';
import NotFound from './pages/not-found';
import Wishlist from './pages/wishlist';
import PaymentSuccess from './pages/payment-success';
import PaymentError from './pages/payment-error';
import ProductDetail from './components/ProductDetails/ProductDetails';
import OrderStatus from './pages/order-status';
import ManageSubscriptions from './pages/manage-subscriptions';
import ShippingReturns from './pages/shipping-returns';
import Register from './pages/register';
import BestSellers from './pages/best-sellers';
import SocialResponsibility from './pages/social-responsibility';
import Blog from './pages/blog';
import Reviews from './pages/reviews';
import NewProducts from './pages/new-products';
import GiftsUnder50 from './pages/gifts-under-50';
import Featured from './pages/featured';
import Accessibility from './pages/accessibility';
import Terms from './pages/terms';
import Privacy from './pages/privacy';

import CreateAccount from './pages/create-account';
import Login from './pages/login';
import Account from './pages/create-account';
import EditProfile from './components/EditProfile/EditProfile';
import AdminOrders from './pages/admin/orders';
import CreateProduct from './pages/create-product';
import CreateSupplier from './components/SupplierForm/SupplierForm'

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { PaymentProvider } from './context/PaymentProvider';
import CheckoutPayment from './context/CheckoutPayment';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import ScrollToTop from './components/ScrollToTop/ScrollToTop';

const App = () => {
  return (
    <div className="app-container">
      <AuthProvider>
        <CartProvider>
          <PaymentProvider>
            <Router>
              <ScrollToTop />
              <Header />
              <LoginBanner />
              <div className="content-wrap">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/create-account" element={<CreateAccount />} />
                  <Route path="/user-profile" element={<UserProfile />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/order-status" element={<OrderStatus />} />
                  <Route path="/manage-subscriptions" element={<ManageSubscriptions />} />
                  <Route path="/shipping-returns" element={<ShippingReturns />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/social-responsibility" element={<SocialResponsibility />} />
                  <Route path="/the-journey" element={<Blog />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/best-sellers" element={<BestSellers />} />
                  <Route path="/new-products" element={<NewProducts />} />
                  <Route path="/gifts-under-50" element={<GiftsUnder50 />} />
                  <Route path="/featured" element={<Featured />} />
                  <Route path="/accessibility" element={<Accessibility />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/create-product" element={<ProtectedRoute element={<CreateProduct />} />} />
                  <Route path="/edit-profile" element={<EditProfile />} />
                  <Route path="/create-supplier" element={<ProtectedRoute element={<CreateSupplier />} />} />
                  <Route path="/checkout" element={<CheckoutPayment />}/>
                  <Route path="/payment-success" element={<PaymentSuccess />} />
                  <Route path="/payment-error" element={<PaymentError />} />
                  <Route path="/admin/orders" element={<ProtectedRoute element={<AdminOrders />} />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
            </Router>
          </PaymentProvider>
        </CartProvider>
      </AuthProvider>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);