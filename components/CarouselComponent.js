import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  Platform,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import IMAGES from "../Assets";

const defaultDataWith6Colors = [
  "#B0604D",
  "#899F9C",
  "#B3C680",
  "#5C6265",
  "#F5D399",
  "#F1F1F1",
];

function CarouselComponent() {
  const width = Dimensions.get("window").width;
  const data = [
    {
      id: 1,
      color: "#8c89fa",
      text: "Успей подать заявку до конца октября",
      textSmall:
        "Выгодные условия сотрудничества по особым тарифам и многое другое при успешном прохождении конкурса.",
      textColor: "white",
    },
    {
      id: 2,
      color: "#BFF48A",
      text: "Выгодные условия сотрудничества",
      textSmall:
        "Выгодные условия сотрудничества по особым тарифам и многое другое при успешном прохождении конкурса.",
      // textColor: "white",
    },
    { id: 3, color: "limegreen", text: "Slide 3" },
  ];
  return (
    <View
      id="carousel-component"
      dataSet={{ kind: "basic-layouts", name: "left-align" }}
      style={styles.container} // Ensure it expands fully
    >
      <Carousel
        loop={false}
        width={300}
        height={223}
        scrollEnabled={true} // Ensure scrolling is enabled
        snapEnabled={false} // Enable snapping to items
        pagingEnabled={Platform.OS === "ios" ? false : true} // Helps with smooth scrolling on Android
        data={data}
        style={{ width: "100%" }}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer, { backgroundColor: item.color }]}>
            <Image source={IMAGES.HOMEILLUSTRATION1} resizeMode="contain" />
            {/* <Text style={[styles.text, { color: item.textColor }]}>
              {item.text}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.textsmallcontainer}>
                <Text style={[styles.textsmall, { color: item.textColor }]}>
                  {item.textSmall}
                </Text>
              </View>
              <View style={styles.leaficoncontainer}>
                <Image
                  source={IMAGES.LEAFS}
                  resizeMode="contain"
                  style={styles.leaficon}
                />
              </View>
            </View> */}
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 500,
    flex: 1,
    paddingTop: 100,
    flexGrow: 1,
    paddingLeft: 19,
    maxHeight: 223,
  },
  itemContainer: {
    borderRadius: 24,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: 223,
    width: 293,
    paddingHorizontal: 25,
    paddingVertical: 28,
  },
  text: {
    color: "white",
    fontSize: 32,
    letterSpacing: Platform.OS === "ios" ? "-1%" : 0,
    fontWeight: "700",
    lineHeight: 32,
  },
  textsmallcontainer: {
    flex: 1,
    alignSelf: "flex-start",
  },
  textsmall: {
    fontSize: 8,
    color: "white",
    lineHeight: 10,
    letterSpacing: Platform.OS === "ios" ? -0.5 : 0,
  },
  leaficoncontainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  leaficon: {
    width: "100%",
    height: 76,
  },
});
export default CarouselComponent;
