import React, { useState } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import IMAGES from "../Assets";
import RgbaColors from "../RgbaColors";

const SearchBarComponent = () => {
  const windowHeight = Dimensions.get("window").height;
  const [activeIcon, setActiveIcon] = useState(2); // Default active icon (index-based)

  const icons = [
    { source: IMAGES.EARTH, inactiveColor: "gray", activeColor: "white" },
    { source: IMAGES.LIST, inactiveColor: "gray", activeColor: "white" },
    {
      source: IMAGES.FILTERACTIVE,
      inactiveColor: "gray",
      activeColor: "white",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.searchContainer, { height: windowHeight / 20 }]}>
        <Image source={IMAGES.SEARCH} style={styles.searchIcon} />
        <TextInput
          placeholder="Поиск"
          placeholderTextColor={RgbaColors.SECONDARY_TEXT_WHITE}
          style={styles.searchInput}
        />
      </View>

      <View style={styles.iconContainer}>
        {icons.map((icon, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setActiveIcon(index)}
            style={[
              styles.iconWrapper,
              activeIcon === index && styles.activeIconBackground,
            ]}
          >
            <Image
              source={icon.source}
              style={{
                width: 24,
                height: 24,
                flex: 1,
                tintColor:
                  activeIcon === index ? icon.activeColor : icon.inactiveColor,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = {
  container: {
    paddingHorizontal: 20,
    flexDirection: "row",
    gap: 5,
    paddingTop: 10,
    paddingBottom: 5,
  },
  searchContainer: {
    minHeight: 40,
    flex: 7,
    backgroundColor: RgbaColors.PRIMARY_WHITE_BACKGROUND,
    flexDirection: "row",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    tintColor: "#FFF",
    height: 24,
    width: 24,
    marginVertical: 8,
    marginLeft: 20,
    marginRight: 10,
  },
  searchInput: {
    color: "white",
    fontSize: 14,
    flex: 1,
  },
  iconContainer: {
    flex: 4,
    backgroundColor: RgbaColors.PRIMARY_WHITE_BACKGROUND,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
  },
  iconWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
  },
  activeIconBackground: {
    backgroundColor: RgbaColors.PRIMARY_PURPLE,
  },
};

export default SearchBarComponent;
