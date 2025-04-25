import axios from 'axios';

const BASE_URL = 'https://api.escuelajs.co/api/v1';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getProductsByCategory = async (categoryId: number): Promise<Product[]> => {
  try {
    const response = await fetch(`${BASE_URL}/categories/${categoryId}/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData extends LoginData {
  username?: string;
}

export interface AuthResponse {
  token: string;
}

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await axios.post(`https://reqres.in/api/login`, data);
  return response.data;
};

export const signup = async (data: SignupData): Promise<AuthResponse> => {
  const response = await axios.post(`https://reqres.in/api/register`, {
    email: data.email,
    password: data.password,
  });
  return response.data;
}; 