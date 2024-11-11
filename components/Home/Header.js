import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import IMAGES from "../../Assets";
import RgbaColors from "../../RgbaColors";

const Header = () => {
  const width = Dimensions.get("window").width;
  const iconButtonWidth = ((width - 40) / 67) * 8;
  const logoWidth = ((width - 40) / 67) * 18;

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingBottom: 10,
      }}
    >
      <View style={{ flex: 8, justifyContent: "center" }}>
        <View
          style={{
            // flex: 1,
            justifyContent: "center",
            alignItems: "center",
            // padding: 8,
            backgroundColor: RgbaColors.PRIMARY_WHITE_BACKGROUND,
            borderRadius: 100,
            width: iconButtonWidth,
            height: iconButtonWidth,
          }}
        >
          <Image
            source={IMAGES.BELL}
            resizeMode="contain"
            style={{
              width: (iconButtonWidth * 4) / 7,
              height: (iconButtonWidth * 4) / 7,
              //   tintColor: "black",
            }}
          />
        </View>
      </View>
      <View
        style={{ flex: 51, alignItems: "center", justifyContent: "center" }}
      >
        <Image
          source={IMAGES.LOGOv2}
          resizeMode="contain"
          style={{ width: logoWidth, height: iconButtonWidth }}
        />
      </View>
      <View style={{ flex: 8, justifyContent: "center" }}>
        <View
          style={{
            // flex: 1,
            justifyContent: "center",
            alignItems: "center",
            // padding: 8,
            backgroundColor: RgbaColors.PRIMARY_WHITE_BACKGROUND,
            borderRadius: 100,
            width: iconButtonWidth,
            height: iconButtonWidth,
          }}
        >
          <Image
            source={IMAGES.CART}
            resizeMode="contain"
            style={{
              width: (iconButtonWidth * 4) / 7,
              height: (iconButtonWidth * 4) / 7,
              //   tintColor: "black",
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Header;
