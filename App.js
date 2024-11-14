import React, { useRef } from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import RgbaColors from "./RgbaColors";

// Import components
import AuthComponent from "./components/Authentication/AuthComponent";
import Home from "./components/Home/Home";

// Import context and assets
import { AuthProvider, useAuth } from "./app/context/AuthContext";
import IMAGES from "./Assets";
import NavigationBarBottom from "./components/Home/NavigationBarBottom";
import CreateSubsidyFormFields from "./components/SubsidyComponents/CreateSubsidyFormFields";
import FlashMessage from "react-native-flash-message";
import { Button } from "@react-navigation/elements";

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
      <NavigationContainer>
        <Layout />
      </NavigationContainer>
    </AuthProvider>
  );
}

export const Layout = () => {
  const width = Dimensions.get("window").width;
  const horizontalPadding = (width * 20) / 375;
  const headerHeight = (width * 40) / 375;
  const { authState } = useAuth();
  const navigation = useNavigation();

  const childRef = useRef();

  return (
    <GestureHandlerRootView style={styles.container}>
      <FlashMessage
        position="top"
        style={{ paddingTop: Platform.OS === "ios" ? 10 : 50 }}
      />
      <Stack.Navigator
        initialRouteName={
          authState.access ? "NavigationBarBottom" : "Authorization"
        }
      >
        {authState.access ? (
          <Stack.Screen
            name="NavigationBarBottom"
            component={NavigationBarBottom} // A new screen containing the Bottom Tab Navigator
            options={{ headerShown: false }} // Hide header here, since it's managed by bottom tabs
          />
        ) : (
          <Stack.Screen
            name="Authorization"
            component={AuthComponent}
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen
          name="FarmField"
          component={CreateSubsidyFormFields}
          options={{
            tabBarIcon: ({ focused }) => renderTabIcon(IMAGES.HOME1, focused),
            headerShown: true,
            headerTitle: "",
            headerShadowVisible: false,
            headerBackVisible: false,
            headerBackTitleVisible: false,
            headerTitleAlign: "center",
            headerTintColor: "white",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <HeaderIcon source={IMAGES.BACKBUTTON} />
              </TouchableOpacity>
            ),
            // headerRight: () => (
            //   <Button onPress={() => console.log("CLICK")}>Update count</Button>
            // ),
            // headerRight: () => (
            //   <TouchableOpacity
            //     onPress={childRef.create}
            //     style={{
            //       backgroundColor: RgbaColors.PRIMARY_PURPLE,
            //       paddingHorizontal: 20,
            //       paddingVertical: 10,
            //       borderRadius: 25,
            //     }}
            //   >
            //     <Text style={{ fontSize: 16, color: "white", fontWeight: 600 }}>
            //       Создать
            //     </Text>
            //   </TouchableOpacity>
            // ),
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
      </Stack.Navigator>
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
