import React from "react";
import { Dimensions, Image, Platform, StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthComponent from "../Authentication/AuthComponent";
import Home from "./Home";
import IMAGES from "../../Assets";
import ProfileMain from "../Profile/ProfileMain";
import Test from "./Test";
import RgbaColors from "../../RgbaColors";
import { BlurView } from "expo-blur";

const Tab = createBottomTabNavigator();

// Reusable function to render tab icons
const renderTabIcon = (source, focused, size = 24) => (
  <Image
    style={{
      tintColor: focused ? "white" : "gray",
      width: size,
      height: size,
    }}
    source={source}
  />
);
const LogoTitle = () => {
  const logoWidth = ((Dimensions.get("window").width - 40) / 67) * 18;
  const iconButtonWidth = ((Dimensions.get("window").width - 40) / 67) * 8;
  return (
    <Image
      style={{ width: logoWidth, height: iconButtonWidth }}
      source={IMAGES.LOGOv2}
    />
  );
};

// HeaderIcon component for reusable icons
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

const NavigationBarBottom = () => {
  const width = Dimensions.get("window").width;
  const horizontalPadding = (width * 20) / 375;
  const headerHeight = (width * 40) / 375;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        headerShadowVisible: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: RgbaColors.TERTIARY_BLACK_BACKGROUND,
          shadowRadius: 0,
          shadowOffset: 0,
          shadowColor: "transparent",
          shadowOpacity: 0,
          borderWidth: 0,
          borderTopWidth: 0,
          position: "absolute",
          // padding: 0,
          // margin: 0,
        },

        // headerShown: false, // No headers from the tab navigator itself
      }}
    >
      <Tab.Screen
        name="Authentication"
        component={AuthComponent}
        options={{
          tabBarIcon: ({ focused }) => renderTabIcon(IMAGES.GRAPH, focused),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => renderTabIcon(IMAGES.HOME1, focused),
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          // headerLeft: () => <HeaderIcon source={IMAGES.BELL} />,
          // headerLeft: () => (
          //   <View style={{ paddingLeft: horizontalPadding }}>
          //     <HeaderIcon source={IMAGES.BELL} />
          //   </View>
          // ),
          // headerRight: () => <HeaderIcon source={IMAGES.CART} />,
          headerRight: () => (
            <View style={{ paddingRight: horizontalPadding }}>
              <HeaderIcon source={IMAGES.CART} />
            </View>
          ),
          headerStyle: {
            backgroundColor:
              Platform.OS === "ios"
                ? RgbaColors.PRIMARY_BLACK_BACKGROUND
                : RgbaColors.PRIMARY_BLACK_BACKGROUND_ANDROID,

            height:
              Platform.OS === "ios" ? headerHeight * 1.4 : headerHeight * 2,
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileMain}
        options={{
          tabBarIcon: ({ focused }) => renderTabIcon(IMAGES.USER, focused),
          headerShown: true,
          headerTitle: LogoTitle,
          headerTitleAlign: "center",

          // headerLeft: () => <HeaderIcon source={IMAGES.BELL} />,
          headerLeft: () => (
            <View style={{ paddingLeft: horizontalPadding }}>
              <HeaderIcon source={IMAGES.BELL} />
            </View>
          ),
          // headerRight: () => <HeaderIcon source={IMAGES.CART} />,
          headerRight: () => (
            <View style={{ paddingRight: horizontalPadding }}>
              <HeaderIcon source={IMAGES.CART} />
            </View>
          ),
          headerStyle: {
            backgroundColor:
              Platform.OS === "ios"
                ? RgbaColors.PRIMARY_BLACK_BACKGROUND
                : RgbaColors.PRIMARY_BLACK_BACKGROUND_ANDROID,

            height:
              Platform.OS === "ios" ? headerHeight * 1.4 : headerHeight * 2,
          },
        }}
      />
      {/* <Tab.Screen
        name="test"
        component={Test}
        options={{
          tabBarIcon: ({ focused }) => renderTabIcon(IMAGES.USER, focused),
        }}
      /> */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: RgbaColors.PRIMARY_WHITE_BACKGROUND,
    borderRadius: 100,
  },
});

export default NavigationBarBottom;
