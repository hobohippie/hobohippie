import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";

// Components that are part of the main layout should not be lazy loaded
import Header from "./components/Header/Header";
import LoginBanner from "./components/LoginBanner/LoginBanner";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// Context providers
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { PaymentProvider } from "./context/PaymentProvider";

// Lazy load all pages and non-critical components
const Home = React.lazy(() => import("./pages/home"));
const About = React.lazy(() => import("./pages/about"));
const Products = React.lazy(() => import("./pages/products"));
const Contact = React.lazy(() => import("./pages/contact"));
const UserProfile = React.lazy(() => import("./pages/user-profile"));
const NotFound = React.lazy(() => import("./pages/not-found"));
const Wishlist = React.lazy(() => import("./pages/wishlist"));
const PaymentSuccess = React.lazy(() => import("./pages/payment-success"));
const PaymentError = React.lazy(() => import("./pages/payment-error"));
const ProductDetail = React.lazy(() =>
  import("./components/ProductDetails/ProductDetails")
);
const OrderStatus = React.lazy(() => import("./pages/order-status"));
const ManageSubscriptions = React.lazy(() =>
  import("./pages/manage-subscriptions")
);
const ShippingReturns = React.lazy(() => import("./pages/shipping-returns"));
const Register = React.lazy(() => import("./pages/register"));
const BestSellers = React.lazy(() => import("./pages/best-sellers"));
const SocialResponsibility = React.lazy(() =>
  import("./pages/social-responsibility")
);
const Blog = React.lazy(() => import("./pages/blog"));
const Reviews = React.lazy(() => import("./pages/reviews"));
const NewProducts = React.lazy(() => import("./pages/new-products"));
const GiftsUnder50 = React.lazy(() => import("./pages/gifts-under-50"));
const Featured = React.lazy(() => import("./pages/featured"));
const Accessibility = React.lazy(() => import("./pages/accessibility"));
const Terms = React.lazy(() => import("./pages/terms"));
const Privacy = React.lazy(() => import("./pages/privacy"));
const CreateAccount = React.lazy(() => import("./pages/create-account"));
const Login = React.lazy(() => import("./pages/login"));
const Account = React.lazy(() => import("./pages/create-account"));
const EditProfile = React.lazy(() =>
  import("./components/EditProfile/EditProfile")
);
const AdminOrders = React.lazy(() => import("./pages/admin/orders"));
const CreateProduct = React.lazy(() => import("./pages/create-product"));
const CreateSupplier = React.lazy(() =>
  import("./components/SupplierForm/SupplierForm")
);
const CheckoutPayment = React.lazy(() => import("./context/CheckoutPayment"));

// Loading fallback component
const LoadingSpinner = () => <div className="loading-spinner">Loading...</div>;

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
                <Suspense fallback={<LoadingSpinner />}>
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
                    <Route
                      path="/manage-subscriptions"
                      element={<ManageSubscriptions />}
                    />
                    <Route
                      path="/shipping-returns"
                      element={<ShippingReturns />}
                    />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/social-responsibility"
                      element={<SocialResponsibility />}
                    />
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
                    <Route
                      path="/create-product"
                      element={<ProtectedRoute element={<CreateProduct />} />}
                    />
                    <Route path="/edit-profile" element={<EditProfile />} />
                    <Route
                      path="/create-supplier"
                      element={<ProtectedRoute element={<CreateSupplier />} />}
                    />
                    <Route path="/checkout" element={<CheckoutPayment />} />
                    <Route
                      path="/payment-success"
                      element={<PaymentSuccess />}
                    />
                    <Route path="/payment-error" element={<PaymentError />} />
                    <Route
                      path="/admin/orders"
                      element={<ProtectedRoute element={<AdminOrders />} />}
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </div>
              <Footer />
            </Router>
          </PaymentProvider>
        </CartProvider>
      </AuthProvider>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
