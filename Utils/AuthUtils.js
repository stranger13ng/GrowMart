import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to check if the user token exists in AsyncStorage
export const checkUserToken = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    return token && token !== ""; // Return true if token exists and is not empty
  } catch (error) {
    console.error("Failed to fetch token from AsyncStorage", error);
    return false; // If an error occurs, consider the user as not signed in
  }
};
