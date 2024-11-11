// AuthComponent.js

import React, { useState } from "react";
import { Alert, StyleSheet, Text, View, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableHighlight } from "react-native";
import { useAuth } from "../../app/context/AuthContext"; // Import the useAuth hook
import LogoComponent from "./LogoComponent";
import Login from "./Login/Login";
import Registration from "./Registration/Registration";
import RgbaColors from "../../RgbaColors";
import { Tab } from "./Tab";

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
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    setLoading(true);
    try {
      await login(username, password);
      Alert.alert("Login Success");
      // Navigate to Home or wherever
    } catch (error) {
      Alert.alert("Login Failed", "Invalid credentials");
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
      Alert.alert("Error", "Please fill in all registration fields");

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
      Alert.alert("Registration Successful");
      // Navigate to Home or wherever
    } catch (error) {
      Alert.alert("Registration error");
    } finally {
      setLoading(false);
    }
  };

  const TabItems = [{ label: "Войти" }, { label: "Регистрация" }];

  return (
    <SafeAreaView style={styles.body}>
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
    </SafeAreaView>
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
  },
});

export default AuthComponent;
