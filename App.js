import React from "react";
import { Dimensions, Image, Platform, StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RgbaColors from "./RgbaColors";

// Import components
import AuthComponent from "./components/Authentication/AuthComponent";
import Home from "./components/Home/Home";

// Import context and assets
import { AuthProvider, useAuth } from "./app/context/AuthContext";
import IMAGES from "./Assets";
import NavigationBarBottom from "./components/Home/NavigationBarBottom";
import CreateSubsidyFormFields from "./components/SubsidyComponents/CreateSubsidyFormFields";

// Define the stack navigator
const Stack = createNativeStackNavigator();

// LogoTitle component
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
  const iconButtonWidth = ((Dimensions.get("window").width - 40) / 67) * 8;
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

export default function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

// Layout Component
export const Layout = () => {
  const { authState } = useAuth();

  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={authState.access ? "Home" : "Authorization"}
        >
          {authState.access ? (
            <Stack.Screen
              name="NavigationBarBottom"
              component={NavigationBarBottom} // A new screen containing the Bottom Tab Navigator
              options={{ headerShown: false }} // Hide header here, since it's managed by bottom tabs
            />
          ) : (
            // <Stack.Screen
            //   name="Home"
            //   component={Home}
            //   options={{
            //     headerShown: true,
            //     headerTitle: LogoTitle,
            //     headerTitleAlign: "center",
            //     headerLeft: () => <HeaderIcon source={IMAGES.BELL} />,
            //     headerRight: () => <HeaderIcon source={IMAGES.CART} />,
            //     headerStyle: {
            //       backgroundColor:
            //         Platform.OS === "ios"
            //           ? RgbaColors.PRIMARY_BLACK_BACKGROUND
            //           : RgbaColors.PRIMARY_BLACK_BACKGROUND_ANDROID,
            //     },
            //   }}
            // />
            <Stack.Screen
              name="Authorization"
              component={AuthComponent}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen name="FarmField" component={CreateSubsidyFormFields} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      Platform.OS === "ios"
        ? RgbaColors.PRIMARY_BLACK_BACKGROUND
        : RgbaColors.PRIMARY_BLACK_BACKGROUND_ANDROID,
    paddingTop: Platform.OS === "ios" ? 60 : 0,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: RgbaColors.PRIMARY_WHITE_BACKGROUND,
    borderRadius: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
