import React from "react";
import { View, Dimensions, Platform, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import IMAGES from "../Assets";

const ScrollViewCarousel = () => {
  const width = Dimensions.get("window").width;
  const cardWidth = ((width - 20) * 53) / 71;
  const cardHeight = (cardWidth * 35) / 53;

  // Reusable card component
  const CarouselCard = ({ imageSource }) => (
    <View
      style={{
        width: cardWidth,
        height: cardHeight,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
      }}
    >
      <Image
        source={imageSource}
        resizeMode="contain"
        style={{ width: cardWidth, height: cardHeight }}
      />
    </View>
  );

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={Platform.OS === "ios" ? 0.99 : 0.9}
        disableIntervalMomentum={true}
        style={{
          flex: 1,
          flexDirection: "row",
          paddingLeft: 20,
        }}
        contentContainerStyle={{
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
          paddingRight: 40,
        }}
      >
        {/* Render Carousel Cards */}
        {[
          IMAGES.HOMEILLUSTRATION1,
          IMAGES.HOMEILLUSTRATION2,
          IMAGES.HOMEILLUSTRATION3,
        ].map((image, index) => (
          <CarouselCard key={index} imageSource={image} />
        ))}
      </ScrollView>
    </View>
  );
};

export default ScrollViewCarousel;
