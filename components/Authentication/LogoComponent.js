import { View, Image, StyleSheet } from "react-native";
import React from "react";
import IMAGES from "../../Assets";

const LogoComponent = () => {
  return (
    <View style={styles.logo_container}>
      <Image source={IMAGES.LOGOv2} resizeMode="contain" style={styles.logo} />
    </View>
  );
};
const styles = StyleSheet.create({
  logo_container: {
    // backgroundColor: "beige",
    paddingHorizontal: 75,
    paddingTop: 55,
  },
  logo: { width: "100%" },
});

export default LogoComponent;
