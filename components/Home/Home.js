// Home.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation for navigation
import { useAuth } from "../../app/context/AuthContext"; // Import useAuth to access the logout function
import ProductCard from "../Products/ProductCard";
import SearchBarComponent from "../SearchBarComponent";
import IMAGES from "../../Assets";
import ScrollViewCarousel from "../ScrollViewCarousel";
import {
  fetchProducts,
  fetchProductsTypes,
} from "../../src/services/ProductService";

const Home = () => {
  const navigation = useNavigation(); // Hook to navigate to other screens
  const { logout, getAuthToken } = useAuth(); // Access the logout function and token from AuthContext

  const [products, setProducts] = useState([]); // State to store products

  // Function to fetch products using the fetchProducts service
  const getProducts = async () => {
    try {
      const token = await getAuthToken(); // Get the token from AuthContext
      const fetchedProducts = await fetchProducts(token); // Call the service to fetch products
      setProducts(fetchedProducts); // Store the fetched products in the state
    } catch (error) {
      console.error("Error fetching products:", error);
      Alert.alert("Error", "Failed to fetch products. Please try again.");
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    getProducts(); // Call the function to fetch products
  }, []); // Empty dependency array to run only once when the component mounts

  // Logout handler
  const onLogoutPress = async () => {
    try {
      await logout(); // Call the logout function from AuthContext
      navigation.navigate("Authorization"); // Navigate to Authorization screen after logout
      Alert.alert("Logged out successfully");
    } catch (error) {
      Alert.alert("Error", "Logout failed, please try again");
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor:
          Platform.OS === "ios"
            ? RgbaColors.PRIMARY_BLACK_BACKGROUND
            : RgbaColors.PRIMARY_BLACK_BACKGROUND_ANDROID,
        paddingTop: Platform.OS === "ios" ? 10 : 5,
      }}
    >
      <ScrollViewCarousel />
      <SearchBarComponent />

      {/* Pass fetched products to the ProductCard component */}
      <ProductCard
        products={
          products.length
            ? products
            : [
                { name: "Лимон", image: IMAGES.LEMON },
                { name: "Капуста", image: IMAGES.CABAGGE },
                { name: "Тыква", image: IMAGES.PUMPKIN },
                { name: "Томат", image: IMAGES.TOMATO },
              ]
        }
      />

      <TouchableOpacity style={styles.button} onPress={onLogoutPress}>
        <Text style={{ color: "#fff" }}>LOGOUT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Styles for the button
const styles = {
  button: {
    backgroundColor: "#FF6347", // You can change the color
    padding: 10,
    alignItems: "center",
    marginTop: 20,
    borderRadius: 5,
  },
};

export default Home;
