// src/services/ProductService.js

import axios from "axios";
import { AUTHAPI } from "../../components/Authentication/Registration/AuthAPI";

/**
 * Fetch products from the API using the given auth token.
 * @param {string} token - The user's auth token.
 * @returns {Promise<any>} - The list of products.
 */
export const fetchProducts = async (token) => {
  try {
    const response = await axios.get(
      `http://${AUTHAPI}/api/products/families/`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token to the header
        },
      }
    );
    return response.data; // Return the fetched products
  } catch (error) {
    throw new Error("Failed to fetch products"); // Throw an error if the request fails
  }
};
export const fetchProductsTypes = async (token) => {
  try {
    const response = await axios.get(`http://${AUTHAPI}/api/products/types/`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add Bearer token to the header
      },
    });
    return response.data; // Return the fetched products
  } catch (error) {
    throw new Error("Failed to fetch products"); // Throw an error if the request fails
  }
};
export const fetchProductsSorts = async (token) => {
  try {
    const response = await axios.get(`http://${AUTHAPI}/api/products/sorts/`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add Bearer token to the header
      },
    });
    return response.data; // Return the fetched products
  } catch (error) {
    throw new Error("Failed to fetch products"); // Throw an error if the request fails
  }
};
