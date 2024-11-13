// Home.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../app/context/AuthContext";
import ProductCard from "../Products/ProductCard";
import SearchBarComponent from "../SearchBarComponent";
import IMAGES from "../../Assets";
import ScrollViewCarousel from "../ScrollViewCarousel";
import {
  fetchProducts,
  fetchProductsTypes,
} from "../../src/services/ProductService";

const Home = () => {
  const [products, setProducts] = useState([]); // State to store all products
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query

  const navigation = useNavigation();
  const { logout, getAuthToken } = useAuth();
  const width = Dimensions.get("window").width;
  const iconButtonWidth = (width / 375) * 40;

  // Function to fetch products
  const getProducts = async () => {
    try {
      const token = await getAuthToken();
      const fetchedProducts = await fetchProductsTypes(token);
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      Alert.alert("Error", "Failed to fetch products. Please try again.");
    }
  };

  // Fetch products when component mounts
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    console.log("Search query changed:", searchQuery);
  }, [searchQuery]);

  // Filter products based on the search query
  const filteredProducts = searchQuery
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products; // Show all products if search query is empty

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

      {/* Pass setSearchQuery to SearchBarComponent */}
      <SearchBarComponent onChangeText={(text) => setSearchQuery(text)} />

      {/* Render ProductCard with filtered products */}
      <ProductCard
        products={
          filteredProducts.length ? filteredProducts : [] // Empty array if no products match the search query
        }
      />

      <View style={{ height: Platform.OS === "ios" ? 120 : 70 }} />
    </ScrollView>
  );
};

export default Home;
