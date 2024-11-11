// components/Tabs.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export function Tab({ data, selectedIndex, onChange }) {
  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        const isActive = index === selectedIndex;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => onChange(index)}
            style={[styles.tab, isActive && styles.activeTab]}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Arrange tabs in a row
    backgroundColor: "rgba(255, 255, 255, 0.07)", // Background color of the tab container
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 71,
    width: "100%",
  },
  tab: {
    // flex: 1, // Each tab takes equal space
    justifyContent: "center", // Center text vertically within each tab
    alignItems: "center", // Center text horizontally within each tab
    borderRadius: 71,
    paddingHorizontal: "11%",
    paddingVertical: 10,
    margin: 5,
  },
  activeTab: {
    backgroundColor: "#8C89FA", // Active tab background color
  },
  tabText: {
    fontSize: 16,
    fontWeight: 600,
    color: "rgba(255, 255, 255, 0.3)",
    lineHeight: 19.5,
  },
  activeTabText: {
    fontWeight: "bold", // Style for active tab text
    color: "white",
  },
});
