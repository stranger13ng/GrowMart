import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View } from "react-native";
import { AUTHAPI } from "../../components/Authentication/Registration/AuthAPI";

// Default context values
const defaultAuthState = {
  access: null,
};

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component to provide authentication state to the app
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(defaultAuthState); // Initial auth state
  const [loading, setLoading] = useState(true); // State for loading screen while checking access

  useEffect(() => {
    // Function to check if an access token exists in AsyncStorage
    const checkStoredAccess = async () => {
      try {
        const access = await AsyncStorage.getItem("useraccess");
        if (access) {
          setAuthState({ access }); // Set access in authState if it exists
        }
      } catch (error) {
        console.error("Failed to load access from AsyncStorage", error);
      }
      setLoading(false); // Set loading to false once the check is complete
    };

    checkStoredAccess();
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      const response = await axios.post(`http://${AUTHAPI}/api/token/`, {
        username,
        password,
      });

      // If the API response contains an access token, store it and update authState
      if (response.data.access) {
        await AsyncStorage.setItem("useraccess", response.data.access);
        setAuthState({ access: response.data.access });
      }
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed");
    }
  };

  // Register function
  const register = async (
    username,
    password,
    companyName,
    lastName,
    firstName,
    selectedItem
  ) => {
    const password2 = password;
    try {
      const response = await axios.post(
        `http://${AUTHAPI}/api/auth/register/`,
        {
          username,
          first_name: firstName,
          last_name: lastName,
          company_name: companyName,
          password,
          legal_entity: selectedItem,
          password2,
        }
      );

      // If the API response contains an access token, store it and update authState
      if (response.data.access) {
        await AsyncStorage.setItem("useraccess", response.data.access);
        setAuthState({ access: response.data.access });
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error("Registration failed");
    }
  };
  const createField = async (
    city,
    region,
    district,
    landUsage,
    cadastre,
    area,
    totalArea,
    user,
    token
  ) => {
    const region_district = district; // It's not clear why you need this variable, but it's passed.

    try {
      const response = await axios.post(
        `http://${AUTHAPI}/api/create/`,
        {
          city,
          region,
          city_district: district,
          ownership: landUsage,
          cadastral_number: cadastre,
          used_area: area,
          total_area: totalArea,
          user,
          region_district,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the header
          },
        }
      );

      // If the API response contains an access token, store it and update authState
      if (response.data.access) {
        await AsyncStorage.setItem("useraccess", response.data.access); // Store the access token in AsyncStorage
        setAuthState({ access: response.data.access }); // Update the auth state with the new access token
      }
    } catch (error) {
      console.error("Field creation error:", error);
      throw new Error("Field creation failed"); // Rethrow error if API request fails
    }
  };

  const createProduct = async (
    family,
    culture,
    sort,
    fraction,
    field,
    token
  ) => {
    try {
      // Sending the POST request to create the product
      const response = await axios.post(
        `http://${AUTHAPI}/api/product/`,
        {
          family,
          type: culture,
          sort,
          fraction,
          field,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the header
          },
        }
      );

      // Check if the response contains an access token and update auth state if necessary
      if (response.data.access) {
        await AsyncStorage.setItem("useraccess", response.data.access); // Store the access token in AsyncStorage
        setAuthState({ access: response.data.access }); // Update the auth state with the new access token
      }

      // Handle successful product creation, possibly return data or trigger further actions
      console.log("Product created successfully:", response.data);
      return response.data; // Optionally return response data if needed in the calling component
    } catch (error) {
      console.error("Product creation error:", error);
      Alert.alert(
        "Error",
        "There was an issue creating the product. Please try again."
      ); // Show a user-friendly error message
      throw new Error("Product creation failed"); // Rethrow error if API request fails
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("useraccess");
      setAuthState({ access: null }); // Clear the access from authState
    } catch (error) {
      console.error("Logout error:", error);
      throw new Error("Logout failed");
    }
  };

  // Function to get the access token from context or AsyncStorage
  const getAuthToken = async () => {
    if (authState.access) {
      return authState.access; // Return the token if already in the state
    }

    const accessToken = await AsyncStorage.getItem("useraccess"); // Check AsyncStorage
    console.log(accessToken);
    return accessToken;
  };

  // If loading, show a loading spinner or placeholder
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        logout,
        register,
        getAuthToken,
        createField,
        createProduct,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
