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

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => logout()} // Pass ref.current
          style={{ justifyContent: "center", paddingLeft: 20 }}
        >
          <View
            style={{
              // flex: 1,
              justifyContent: "center",
              alignItems: "center",
              // padding: 8,
              backgroundColor: RgbaColors.PRIMARY_WHITE_BACKGROUND,
              borderRadius: 100,
              width: iconButtonWidth,
              height: iconButtonWidth,
            }}
          >
            <Image
              source={IMAGES.LOGOUT}
              resizeMode="contain"
              style={{
                width: (iconButtonWidth * 4) / 7,
                height: (iconButtonWidth * 4) / 7,
                marginRight: 5,
                //   tintColor: "black",
              }}
            />
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const onLogoutPress = async () => {
    try {
      await logout(); // Call the logout function from AuthContext
      navigation.navigate("Authorization"); // Navigate to Authorization screen after logout
      Alert.alert("Logged out successfully");
    } catch (error) {
      Alert.alert("Error", "Logout failed, please try again");
    }
  };

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
