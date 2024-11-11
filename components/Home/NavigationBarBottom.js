import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthComponent from "../Authentication/AuthComponent";
import Home from "./Home";
import IMAGES from "../../Assets";
import ProfileMain from "../Profile/ProfileMain";
import Test from "./Test";

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

const NavigationBarBottom = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: "black" },
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
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileMain}
        options={{
          tabBarIcon: ({ focused }) => renderTabIcon(IMAGES.USER, focused),
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

export default NavigationBarBottom;
