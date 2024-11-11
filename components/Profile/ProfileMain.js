import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import IMAGES from "../../Assets";
import RgbaColors from "../../RgbaColors";
import { useAuth } from "../../app/context/AuthContext";
import { fetchUserProfile } from "../../src/services/UserProfileService";
import { useNavigation } from "@react-navigation/native"; // Navigation hook

const ProfileMain = () => {
  const { logout, getAuthToken } = useAuth();
  const [profile, setProfile] = useState([]);
  const screenWidth = Dimensions.get("window").width;
  const navigation = useNavigation(); // Initialize navigation

  const getUserProfile = async () => {
    try {
      const token = await getAuthToken(); // Get the token from AuthContext
      const fetchedProfile = await fetchUserProfile(token); // Fetch profile data
      console.log(fetchedProfile);
      setProfile(fetchedProfile);
    } catch (error) {
      console.error("Error fetching user:", error);
      Alert.alert("Error", "Failed to fetch user. Please try again.");
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []); // Empty dependency array to fetch data once

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
      {profile.map((user, index) => {
        return (
          <View
            key={index} // Add a key for each profile in the map
            style={{
              flex: 1,
              marginHorizontal: 20,
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: RgbaColors.PRIMARY_WHITE_BACKGROUND,
                borderRadius: 20,
              }}
            >
              <View style={{ flex: 1, margin: 10 }}>
                <View style={{ alignItems: "flex-end", flex: 1 }}>
                  <TouchableOpacity
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: RgbaColors.PRIMARY_WHITE_BACKGROUND,
                      borderRadius: 40,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={IMAGES.SETTINGS}
                      resizeMode="contain"
                      style={{ width: 24, height: 24 }}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    marginTop: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={IMAGES.AVATAR}
                    resizeMode="contain"
                    style={{
                      width: (screenWidth / 375) * 110,
                      height: (screenWidth / 375) * 110,
                    }}
                  />
                  <View
                    style={{
                      marginTop: 15,
                      flexDirection: "row",
                      gap: 5,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: 600,
                      }}
                    >
                      {user.company_name}
                    </Text>
                    <Image
                      source={IMAGES.VERIFIED}
                      resizeMode="contain"
                      style={{ width: 24, height: 24 }}
                    />
                  </View>
                </View>
              </View>

              <View style={{ flex: 1, margin: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: RgbaColors.PRIMARY_WHITE_BACKGROUND,
                        borderRadius: 40,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                      }}
                      onPress={() => navigation.navigate("FarmField")} // Navigate to Details screen
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 16,
                          fontWeight: 600,
                        }}
                      >
                        Добавить
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={{
                        width: 40,
                        height: 40,
                        backgroundColor: RgbaColors.PRIMARY_WHITE_BACKGROUND,
                        borderRadius: 40,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={IMAGES.PEN}
                        resizeMode="contain"
                        style={{ width: 24, height: 24 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <View style={{ flex: 1, margin: 10 }}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      Выберите поле
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      marginBottom: 15,
                      width: screenWidth - 60,
                      height: (screenWidth / 375) * 125,
                    }}
                  >
                    <Image
                      source={IMAGES.NOFIELDIMAGE}
                      resizeMode="contain"
                      style={{
                        width: screenWidth - 60,
                        height: (screenWidth / 375) * 125,
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* Additional sections */}
            <View>
              <View style={{ flex: 1, margin: 10 }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  Все товары
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  marginBottom: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={IMAGES.EMPTYPRODUCTS}
                  resizeMode="contain"
                  style={{
                    width: screenWidth,
                    height: (screenWidth / 375) * 137,
                  }}
                />
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default ProfileMain;
