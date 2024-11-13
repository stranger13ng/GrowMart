import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../app/context/AuthContext"; // Import the useAuth hook
import LogoComponent from "./LogoComponent";
import Login from "./Login/Login";
import Registration from "./Registration/Registration";
import RgbaColors from "../../RgbaColors";
import { Tab } from "./Tab";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { showMessage } from "react-native-flash-message";

const AuthComponent = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, logout, register } = useAuth(); // Get login and logout from the context

  const handleLogin = async () => {
    if (!username || !password) {
      showMessage({
        message: "Заполните все поля",
        type: "danger",
        icon: "danger",
        duration: 3000, // Display for 3 seconds
      });
      return;
    }

    setLoading(true);
    try {
      await login(username, password);
      showMessage({
        message: "Выполнен вход в аккаунт",
        type: "success",
        icon: "success",
        duration: 3000, // Display for 3 seconds
        backgroundColor: "#28a745", // Green color for success
      });
      // Navigate to Home or wherever
    } catch (error) {
      showMessage({
        message: "Ошибка при входе в аккаунт",
        type: "danger",
        icon: "danger",
        duration: 3000, // Display for 3 seconds
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (
      !username ||
      !password ||
      !firstName ||
      !lastName ||
      !companyName ||
      !selectedItem
    ) {
      showMessage({
        message: "Заполните все поля",
        type: "danger",
        icon: "danger",
        duration: 3000, // Display for 3 seconds
      });

      return;
    }
    setLoading(true);
    const password2 = password;
    try {
      await register(
        username,
        password,
        companyName,
        lastName,
        firstName,
        selectedItem,
        password2
      );
      showMessage({
        message: "Registration Successful",
        type: "success",
        icon: "success",
        duration: 3000, // Display for 3 seconds
        backgroundColor: "#28a745", // Green color for success
      });
      // Navigate to Home or wherever
    } catch (error) {
      showMessage({
        message: "Ошибка при создании аккаунта",
        type: "danger",
        icon: "danger",
        duration: 3000, // Display for 3 seconds
      });
    } finally {
      setLoading(false);
    }
  };

  const TabItems = [{ label: "Войти" }, { label: "Регистрация" }];

  return (
    <KeyboardAwareScrollView
      style={styles.body}
      keyboardVerticalOffset={Platform.OS === "ios" ? 150 : 0}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Wrap everything inside TouchableWithoutFeedback to dismiss the keyboard when tapping outside */}
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          // decelerationRate={Platform.OS === "ios" ? 0.99 : "fast"}
          style={styles.scrollViewContent}
        >
          <LogoComponent />

          <View style={styles.auth_container}>
            {/* Tab for Login and Registration */}
            <Tab
              data={TabItems}
              selectedIndex={selectedIndex}
              onChange={setSelectedIndex}
            />

            {selectedIndex === 0 ? (
              <Login
                onChangeText={setUsername}
                onChangePassword={setPassword}
                onLogin={handleLogin}
                loading={loading}
              />
            ) : (
              <Registration
                onChangeText={(field, value) => {
                  if (field === "firstName") setFirstName(value);
                  else if (field === "lastName") setLastName(value);
                  else if (field === "username") setUsername(value);
                  else if (field === "companyName") setCompanyName(value);
                }}
                onChangePassword={setPassword}
                onSelectedCompany={setSelectedItem} // Corrected here
                onRegister={handleRegister}
              />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor:
      Platform.OS === "ios"
        ? RgbaColors.PRIMARY_BLACK_BACKGROUND
        : RgbaColors.PRIMARY_BLACK_BACKGROUND_ANDROID,
    flex: 1,
  },
  auth_container: {
    marginHorizontal: 55,
    borderRadius: 71,
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // This will help center the form vertically
  },
  scrollViewContent: {
    flexGrow: 1,
    flex: 1,
    justifyContent: "center", // This centers the form content
  },
});

export default AuthComponent;
