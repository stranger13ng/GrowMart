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
import React, { useCallback, useEffect, useState } from "react";
import IMAGES from "../../Assets";
import RgbaColors from "../../RgbaColors";
import { useAuth } from "../../app/context/AuthContext";
import {
  fetchFieldslist,
  fetchProductlist,
  fetchRegionlist,
  fetchUserProfile,
} from "../../src/services/UserProfileService";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FieldCard } from "./FieldCard";
import { showMessage } from "react-native-flash-message";

const ProfileMain = () => {
  const { logout, getAuthToken } = useAuth();
  const [profile, setProfile] = useState([]);
  const screenWidth = Dimensions.get("window").width;
  const navigation = useNavigation();
  const width = Dimensions.get("window").width;
  const cardWidth = (width * 271) / 375;
  const cardHeight = (cardWidth * 155) / 271;
  const cardminPadding = (cardWidth * 10) / 271;
  const cardmaxPadding = (cardWidth * 20) / 271;
  const verticalDistance = (cardWidth * 10) / 271;
  const [fieldData, setFieldData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [item, setItem] = useState(null);
  const [regionList, setLegionList] = useState(null);

  const handlePress = (index, item) => {
    setSelectedIndex(index); // Update selected index when a FieldCard is pressed
    setItem(item);
  };

  const getFieldData = async () => {
    try {
      const token = await getAuthToken();
      const fieldDataList = await fetchFieldslist(token);
      const regionList = await fetchRegionlist(token);
      setFieldData(fieldDataList);
      setLegionList(regionList);
    } catch (error) {
      console.log(error);
      showMessage({
        message: error.message || "An error occurred",
        type: "danger",
        icon: "danger",
        duration: 3000,
      });
    }
  };
  useEffect(() => {
    getFieldData();
  }, []);
  const getProductData = async () => {
    try {
      const token = await getAuthToken();
      const productDataList = await fetchProductlist(token);
      setProductData(productDataList);
    } catch (error) {
      console.log(error);
      showMessage({
        message: error.message || "An error occurred",
        type: "danger",
        icon: "danger",
        duration: 3000,
      });
    }
  };
  useEffect(() => {
    getProductData();
  }, []);
  const getUserProfile = async () => {
    try {
      const token = await getAuthToken(); // Get the token from AuthContext
      const fetchedProfile = await fetchUserProfile(token); // Call the service to fetch the profile
      setProfile(fetchedProfile);
    } catch (error) {
      console.error("Error fetching user:", error);
      Alert.alert("Error", "Failed to fetch user. Please try again.");
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []); // Empty dependency array to run only once when the component mounts

  useFocusEffect(
    useCallback(() => {
      getFieldData();
      getProductData();
      getUserProfile();
    }, [])
  );

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
      {/* Fix: Ensure you return the JSX from the map */}
      {profile.map((user, index) => {
        return (
          <View
            key={index} // Add a key for each item in the list
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
                      onPress={() => navigation.navigate("FarmField", { user })}
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

                {/* Conditionally render either the ScrollView with FieldCards or the No Field Image */}
                {fieldData != "" && productData != "" ? (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={Platform.OS === "ios" ? 0.99 : 0.9}
                    disableIntervalMomentum={true}
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingLeft: verticalDistance,
                    }}
                    contentContainerStyle={{
                      gap: verticalDistance, // Set spacing between cards
                      justifyContent: "center",
                      alignItems: "center",
                      paddingRight: verticalDistance * 2,
                    }}
                  >
                    {/* Render Carousel Cards */}
                    {fieldData.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          handlePress(index, item);
                        }}
                      >
                        <FieldCard
                          data={item}
                          productData={productData}
                          style={{
                            backgroundColor:
                              selectedIndex === index
                                ? RgbaColors.PRIMARY_PURPLE
                                : RgbaColors.PRIMARY_WHITE_BACKGROUND, // Conditional styling
                            padding: 10,
                            borderRadius: 10,
                          }}
                        />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                ) : (
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
                )}
              </View>
              {item ? (
                <>
                  <View
                    style={{
                      marginTop: verticalDistance,
                      paddingHorizontal: verticalDistance * 2.2,
                      flex: 1,
                      marginBottom: verticalDistance,
                    }}
                  >
                    <Text
                      style={{ color: "white", fontSize: 12, fontWeight: 600 }}
                    >
                      Местоположение
                    </Text>
                  </View>
                  <View
                    style={{ paddingHorizontal: verticalDistance, flex: 1 }}
                  >
                    <View
                      style={{
                        backgroundColor: RgbaColors.PRIMARY_WHITE_BACKGROUND,
                        flex: 1,
                        width: width - verticalDistance * 6,
                        height: (width / 375) * 125,
                        borderRadius: 20,
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          flex: 1,
                          marginHorizontal: verticalDistance * 2,
                        }}
                      >
                        <View>
                          <Text
                            style={{
                              color: RgbaColors.PRIMARY_PURPLE,
                              fontSize: 16,
                              fontWeight: 700,
                            }}
                          >
                            {item.region_district}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              color: "white",
                              fontSize: 12,
                              fontWeight: 500,
                            }}
                          >
                            {regionList.find(
                              (region) => region.id === item.region
                            )?.region || "Region not found"}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          justifyContent: "center",
                          marginRight: verticalDistance * 2,
                        }}
                      >
                        <Image
                          source={IMAGES.MAPILLUSTRATION2}
                          resizeMode="contain"
                          style={{
                            width: (width / 375) * 123,
                            height: (width / 375) * 95,
                          }}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        gap: verticalDistance,
                        flex: 1,
                        marginTop: verticalDistance,
                        marginBottom: verticalDistance * 2,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: RgbaColors.PRIMARY_WHITE_BACKGROUND,
                          flex: 1,
                          width: (width / 375) * 152.5,
                          height: (width / 375) * 130,
                          borderRadius: 20,
                        }}
                      >
                        <View
                          style={{
                            marginLeft: verticalDistance * 2,
                            marginTop: verticalDistance * 2,
                            width: (width / 375) * 79,
                            height: (width / 375) * 56,
                            justifyContent: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              fontSize: 32,
                              fontWeight: 600,
                            }}
                          >
                            {item.total_area}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginLeft: verticalDistance * 2,
                            marginTop: verticalDistance / 2.5,
                          }}
                        >
                          <Text
                            style={{
                              color: RgbaColors.PRIMARY_PURPLE,
                              fontSize: 12,
                              fontWeight: 600,
                            }}
                          >
                            Общая
                          </Text>
                          <Text
                            style={{
                              color: "white",
                              fontSize: 12,
                              fontWeight: 600,
                            }}
                          >
                            Площадь Га
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          backgroundColor: RgbaColors.PRIMARY_WHITE_BACKGROUND,
                          flex: 1,
                          width: (width / 375) * 152.5,
                          height: (width / 375) * 130,
                          borderRadius: 20,
                        }}
                      >
                        <View
                          style={{
                            marginLeft: verticalDistance * 2,
                            marginTop: verticalDistance * 2,
                            width: (width / 375) * 79,
                            height: (width / 375) * 56,
                            justifyContent: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              fontSize: 32,
                              fontWeight: 600,
                            }}
                          >
                            {item.used_area}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginLeft: verticalDistance * 2,
                            marginTop: verticalDistance / 2.5,
                          }}
                        >
                          <Text
                            style={{
                              color: RgbaColors.PRIMARY_PURPLE,
                              fontSize: 12,
                              fontWeight: 600,
                            }}
                          >
                            Используемая
                          </Text>
                          <Text
                            style={{
                              color: "white",
                              fontSize: 12,
                              fontWeight: 600,
                            }}
                          >
                            Площадь Га
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </>
              ) : (
                <></>
              )}
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
                  source={IMAGES.INFOPANELFOOTER}
                  resizeMode="contain"
                  style={{
                    width: screenWidth,
                    height: (screenWidth / 375) * 137,
                  }}
                />
              </View>
            </View>
            {/* Additional sections */}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default ProfileMain;
