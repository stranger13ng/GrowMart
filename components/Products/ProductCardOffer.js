import React from "react";
import { View, Text, TouchableHighlight, Image } from "react-native";
import PropTypes from "prop-types";
import IMAGES from "../../Assets";
import RgbaColors from "../../RgbaColors";

const ProductCardOffer = ({
  companyName,
  completionRate,
  transactions,
  minQuantity,
  maxQuantity,
  pricePerKg,
}) => {
  const handlePin = () => {
    // console.log("PIN Button was pressed");
  };

  return (
    <View
      style={{
        marginHorizontal: 20,
        marginVertical: 5,
        padding: 5,
        borderRadius: 20,
        backgroundColor: RgbaColors.PRIMARY_WHITE_BACKGROUND,
        flex: 1,
      }}
    >
      <View style={{ flex: 1, paddingLeft: 10 }}>
        <View style={{ marginBottom: 10, flexDirection: "row" }}>
          <View style={{ marginRight: 10, flex: 1, marginTop: 10 }}>
            <Text style={{ color: "white", fontWeight: "600", fontSize: 20 }}>
              {companyName}
            </Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text
                style={{ color: "#8C89FA", fontWeight: "500", fontSize: 10 }}
              >
                Исполнено {completionRate}%
              </Text>
              <Text
                style={{ color: "#8C89FA", fontWeight: "500", fontSize: 10 }}
              >
                •
              </Text>
              <Text
                style={{ color: "#8C89FA", fontWeight: "500", fontSize: 10 }}
              >
                Сделок {transactions}
              </Text>
            </View>
          </View>
          <View>
            <TouchableHighlight
              onPress={handlePin}
              style={{
                borderRadius: 50,
                backgroundColor: RgbaColors.PRIMARY_WHITE_BACKGROUND,
                paddingLeft: 9,
                paddingRight: 7,
                paddingTop: 7,
                paddingBottom: 9,
              }}
            >
              <Image
                source={IMAGES.PIN}
                resizeMode="contain"
                style={{ width: 21, height: 21 }}
              />
            </TouchableHighlight>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <QuantityInfo
            type="Мин"
            quantity={minQuantity}
            icon={IMAGES.ARROWDOWN}
          />
          <QuantityInfo
            type="Макс"
            quantity={maxQuantity}
            icon={IMAGES.ARROWUP}
          />
          <View style={{ alignItems: "flex-end", flex: 1 }}>
            <TouchableHighlight
              style={{
                borderRadius: 25,
                backgroundColor: RgbaColors.PRIMARY_PURPLE,
                minHeight: 49,
                minWidth: 141,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#FFF",
                  fontWeight: "600",
                  fontSize: 16,
                  padding: 15,
                }}
              >
                {pricePerKg} ₸/кг
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </View>
  );
};

const QuantityInfo = ({ type, quantity, icon }) => (
  <View style={{}}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: 12,
          height: 12,
          tintColor: RgbaColors.PRIMARY_PURPLE,
        }}
      />
      <Text
        style={{
          color: "#fff",
          fontWeight: "600",
          fontSize: 12,
        }}
      >
        {type}
      </Text>
    </View>
    <Text
      style={{
        color: RgbaColors.SECONDARY_TEXT_WHITE,
        fontWeight: "500",
        fontSize: 10,
        paddingLeft: 12,
      }}
    >
      {quantity} тонн
    </Text>
  </View>
);

ProductCardOffer.propTypes = {
  companyName: PropTypes.string.isRequired,
  completionRate: PropTypes.string.isRequired,
  transactions: PropTypes.string.isRequired,
  minQuantity: PropTypes.string.isRequired,
  maxQuantity: PropTypes.string.isRequired,
  pricePerKg: PropTypes.string.isRequired,
};

export default ProductCardOffer;
