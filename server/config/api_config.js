export const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

export const API_ROUTES = {
    // Account Routes
    LOGIN: `${API_BASE}/api/login`,
    CREATE_ACCOUNT: `${API_BASE}/api/create-account`,

    // Supplier Routes
    CREATE_SUPPLIER: `${API_BASE}/api/create-supplier`,
    GET_ALL_SUPPLIERS: `${API_BASE}/api/suppliers`,
    GET_SUPPLIER_BY_ID: (id) => `${API_BASE}/api/suppliers/${id}`,
    UPDATE_SUPPLIER: (id) => `${API_BASE}/api/suppliers/${id}`,
    DELETE_SUPPLIER: (id) => `${API_BASE}/api/suppliers/${id}`,

    // Product Routes
    CREATE_PRODUCT: `${API_BASE}/api/create-product`,
    GET_ALL_PRODUCTS: `${API_BASE}/api/products`,
    GET_PRODUCT_BY_ID: (id) => `${API_BASE}/api/products/${id}`,
    UPDATE_PRODUCT: (id) => `${API_BASE}/api/products/${id}`,
    DELETE_PRODUCT: (id) => `${API_BASE}/api/products/${id}`,

    // Tag Routes
    GET_ALL_TAGS: `${API_BASE}/api/tags`,
    CREATE_TAG: `${API_BASE}/api/tags`,
    DELETE_TAG: (name) => `${API_BASE}/api/tags/${name}`,
};
