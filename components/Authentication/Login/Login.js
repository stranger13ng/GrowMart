import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from "react-native";
import React from "react";

const Login = ({ onChangeText, onChangePassword, onLogin }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.field_heading]}>IIN/BIN</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeText}
        // placeholder="Username"
        autoComplete="username"
        inputMode="numeric"
      />
      <Text style={[styles.field_heading, { paddingTop: 15 }]}>Пароль</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangePassword}
        // placeholder="Password"
        autoComplete="password"
        inputMode="password"
        secureTextEntry
      />
      <View style={styles.touchableButton}>
        <TouchableHighlight style={styles.loginButton} onPress={onLogin}>
          <Text style={styles.loginButtonText}>Войти</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-evenly",
    paddingTop: 25,
  },
  field_heading: {
    color: "white",
    paddingLeft: 20,
    paddingBottom: 6,
    fontSize: 12,
    fontWeight: 700,
  },
  textInput: {
    borderColor: "black",
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    borderWidth: 1,
    width: "100%",
    borderRadius: 50,
    height: 50,
    paddingLeft: 25,
    color: "white",
  },
  loginButton: {
    // height: 50,
    paddingVertical: 15,
    backgroundColor: "rgba(140, 137, 250, 0.2)",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  touchableButton: {
    borderRadius: 50,
    paddingTop: 45,
  },
});

export default Login;
