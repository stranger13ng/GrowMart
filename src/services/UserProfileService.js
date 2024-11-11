// src/services/ProductService.js

import axios from "axios";
import { AUTHAPI } from "../../components/Authentication/Registration/AuthAPI";

/**
 * Fetch products from the API using the given auth token.
 * @param {string} token - The user's auth token.
 * @returns {Promise<any>} - The list of products.
 */
export const fetchUserProfile = async (token) => {
  try {
    const response = await axios.get(`http://${AUTHAPI}/api/user/`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add Bearer token to the header
      },
    });
    return response.data; // Return the fetched products
  } catch (error) {
    throw new Error("Failed to fetch user"); // Throw an error if the request fails
  }
};
export const createFieldUser = async (token) => {
  try {
    const response = await axios.post(`http://${AUTHAPI}/api/create/`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add Bearer token to the header
      },
    });
    return response.data; // Return the fetched products
  } catch (error) {
    throw new Error("Failed to fetch user"); // Throw an error if the request fails
  }
};
export const fetchRegionlist = async (token) => {
  try {
    const response = await axios.get(`http://${AUTHAPI}/api/region/`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add Bearer token to the header
      },
    });
    return response.data; // Return the fetched products
  } catch (error) {
    throw new Error("Failed to fetch user"); // Throw an error if the request fails
  }
};
