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
import { HeaderTitle } from "@react-navigation/elements";

const Home = () => {
  const HeaderIcon = ({ source }) => {
    const iconButtonWidth = ((Dimensions.get("window").width - 40) / 67) * 9;
    return (
      <View
        style={[
          styles.iconContainer,
          { width: iconButtonWidth, height: iconButtonWidth },
        ]}
      >
        <Image
          source={source}
          resizeMode="contain"
          style={{
            width: (iconButtonWidth * 4) / 7,
            height: (iconButtonWidth * 4) / 7,
          }}
        />
      </View>
    );
  };

  const navigation = useNavigation(); // Hook to navigate to other screens
  const width = Dimensions.get("window").width;

  const { logout, getAuthToken } = useAuth(); // Access the logout function and token from AuthContext
  const horizontalPadding = (width * 20) / 375;
  const iconButtonWidth = (width / 375) * 40;

  const [products, setProducts] = useState([]); // State to store products

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
