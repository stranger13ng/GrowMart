import React from "react";
import { View, Image, Text, Dimensions } from "react-native";
import RgbaColors from "../../RgbaColors";
import IMAGES from "../../Assets";

const ProductInfoPanel = ({
  productName,
  pricePerKg,
  offersCount,
  productImage,
}) => {
  const width = Dimensions.get("window").width;
  const InfoPanelHeaderWidth = width - 40;
  const InfoPanelHeaderHeight = (InfoPanelHeaderWidth / 335) * 108;
  const InfoPanelDataHeight = (InfoPanelHeaderWidth / 335) * 158;
  const InfoPanelDataWidth = (InfoPanelHeaderWidth / 335) * 130;
  const InfoPanelDataImageWidth = (InfoPanelHeaderWidth / 335) * 200;
  const InfoPanelDataImageHeight = (InfoPanelHeaderWidth / 335) * 115;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { height: InfoPanelHeaderHeight }]}>
        <Text style={styles.headerText}>{productName}</Text>
        <View style={styles.iconContainer}>
          <Image source={IMAGES.PIN} resizeMode="contain" style={styles.icon} />
        </View>
      </View>
      <View style={styles.dataContainer}>
        <View
          style={[
            styles.dataBox,
            { height: InfoPanelDataHeight, width: InfoPanelDataWidth },
          ]}
        >
          <View style={styles.dataContent}>
            <View style={styles.dataItem}>
              <Text style={styles.dataText}>{pricePerKg}₸/кг</Text>
              <Text style={styles.dataLabel}>Средняя цена</Text>
            </View>
            <View style={styles.dataItem}>
              <Text style={styles.dataText}>{offersCount}</Text>
              <Text style={styles.dataLabel}>Предложений</Text>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.imageBox,
            { height: InfoPanelDataHeight, width: InfoPanelDataImageWidth },
          ]}
        >
          <Image
            source={productImage}
            resizeMode="contain"
            style={{
              height: InfoPanelDataImageHeight,
              width: InfoPanelDataImageWidth,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    // marginTop: 100,
    marginHorizontal: 20,
    flex: 1,
    gap: 5,
  },
  header: {
    flexDirection: "row",
    backgroundColor: RgbaColors.PRIMARY_WHITE_BACKGROUND,
    alignItems: "center",
    borderRadius: 20,
    padding: 15,
    flex: 1,
  },
  headerText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 36,
    flex: 1,
  },
  iconContainer: {
    backgroundColor: RgbaColors.PRIMARY_PURPLE,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderRadius: 24,
  },
  icon: {
    width: 24,
    height: 24,
    margin: 8,
  },
  dataContainer: {
    flexDirection: "row",
    gap: 5,
  },
  dataBox: {
    backgroundColor: RgbaColors.PRIMARY_WHITE_BACKGROUND,
    borderRadius: 20,
  },
  dataContent: {
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
    flex: 1,
  },
  dataItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  dataText: {
    fontWeight: "700",
    fontSize: 20,
    color: RgbaColors.PRIMARY_PURPLE,
  },
  dataLabel: {
    fontWeight: "600",
    fontSize: 14,
    color: "white",
  },
  imageBox: {
    backgroundColor: RgbaColors.PRIMARY_WHITE_BACKGROUND,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
};

export default ProductInfoPanel;
