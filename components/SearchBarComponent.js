import React, { useState } from "react";
import { View, Image, TextInput, Dimensions } from "react-native";
import PropTypes from "prop-types";
import IMAGES from "../Assets";
import RgbaColors from "../RgbaColors";
import { TouchableOpacity } from "react-native-gesture-handler";

const SearchBarComponent = ({ onChangeText }) => {
  const windowHeight = Dimensions.get("window").height;
  const [activeIcon, setActiveIcon] = useState(2); // Default active icon (index-based)
  const [searchQuery, setSearchQuery] = useState(""); // Local state for search query

  const icons = [
    { source: IMAGES.EARTH, inactiveColor: "gray", activeColor: "white" },
    { source: IMAGES.LIST, inactiveColor: "gray", activeColor: "white" },
    {
      source: IMAGES.FILTERACTIVE,
      inactiveColor: "gray",
      activeColor: "white",
    },
  ];

  // Handle input changes and update search query
  const handleInputChange = (text) => {
    setSearchQuery(text); // Update local state
    onChangeText(text); // Trigger parent component's callback
  };

  return (
    <View style={styles.container}>
      <View style={[styles.searchContainer, { height: windowHeight / 20 }]}>
        <Image source={IMAGES.SEARCH} style={styles.searchIcon} />
        <TextInput
          value={searchQuery}
          onChangeText={handleInputChange}
          placeholder="Поиск"
          placeholderTextColor={RgbaColors.SECONDARY_TEXT_WHITE}
          style={styles.searchInput}
        />
        {searchQuery != null && searchQuery != "" && (
          <TouchableOpacity
            onPress={() => {
              handleInputChange(null);
            }}
          >
            <Image source={IMAGES.CROSS} style={styles.crossIcon} />
          </TouchableOpacity>
        )}
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
  crossIcon: {
    tintColor: "#FFF",
    height: 12,
    width: 12,
    marginVertical: 8,
    marginLeft: 10,
    marginRight: 20,
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
    // gap: 12,
  },
  iconWrapper: {
    // flex: 1,
    height: 42,
    width: 42,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
  },
  activeIconBackground: {
    backgroundColor: RgbaColors.PRIMARY_PURPLE,
  },
};

// Define prop types for better clarity
SearchBarComponent.propTypes = {
  onChangeText: PropTypes.func.isRequired,
};

export default SearchBarComponent;
