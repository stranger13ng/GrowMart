import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import PropTypes from "prop-types";
import RgbaColors from "../../RgbaColors";
import IMAGES from "../../Assets";

const ProductCard = ({ products }) => {
  const windowWidth = Dimensions.get("window").width;
  const cardWidth = (windowWidth - 45) / 2;
  const cardHeight = cardWidth;
  console.log(products);
  return (
    <View style={{ flex: 1, paddingTop: 5 }}>
      {products.length === 0 ? (
        <Text style={{ textAlign: "center", color: "white", fontWeight: 700 }}>
          Ничего не найдено.
        </Text>
      ) : (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            paddingHorizontal: 20,
            gap: 5,
          }}
        >
          {products.map((product, index) => (
            <ProductCardItem
              key={index}
              product={product}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const ProductCardItem = ({ product, cardWidth, cardHeight }) => (
  <View
    style={{
      height: cardHeight,
      width: cardWidth,
      backgroundColor: RgbaColors.PRIMARY_WHITE_BACKGROUND,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
    }}
  >
    <Image
      source={IMAGES[product.image]}
      resizeMode="contain"
      style={{ height: cardHeight / 2.5 }}
    />
    <Text style={{ color: "white", fontWeight: "700", fontSize: 24 }}>
      {product.name}
    </Text>
  </View>
);

ProductCard.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.any.isRequired,
    })
  ).isRequired,
};

export default ProductCard;
