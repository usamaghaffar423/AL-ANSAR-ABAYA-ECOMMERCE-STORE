// API URL - Uses environment variable with fallback to domain
const prodApiUrl = import.meta.env.VITE_API_URL || 'https://alansarabaya.pk/api';
const devApiUrl = 'http://localhost/ABAYA-AL-ANSAR-ECOMMERCE-STORE/abaya-ecommerce-store/api';

export const API_BASE_URL = import.meta.env.PROD ? prodApiUrl : devApiUrl;

// Base URL for product images stored as relative paths in the DB
const prodImageUrl = import.meta.env.VITE_IMAGE_URL || 'https://alansarabaya.pk/';
const devImageUrl = 'http://localhost/ABAYA-AL-ANSAR-ECOMMERCE-STORE/abaya-ecommerce-store/';

export const IMAGE_BASE_URL = import.meta.env.PROD ? prodImageUrl : devImageUrl;
