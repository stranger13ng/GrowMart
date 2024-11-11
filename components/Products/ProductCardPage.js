import { View, Text } from "react-native";
import React from "react";
import Header from "../Home/Header";
import ProductInfoPanel from "./ProductInfoPanel";
import IMAGES from "../../Assets";
import ProductCardOffer from "./ProductCardOffer";
import SearchBarComponent from "../SearchBarComponent";

const ProductCardPage = () => {
  return (
    <View>
      <ProductInfoPanel
        productName="Тыква"
        pricePerKg="210"
        offersCount="307"
        productImage={IMAGES.PUMPKIN}
      />
      <SearchBarComponent />
      <ProductCardOffer
        companyName="ИП 'ЭкоОгородник'"
        completionRate="98.7"
        transactions="56"
        minQuantity="2000"
        maxQuantity="4000"
        pricePerKg="5000,75"
      />
      <ProductCardOffer
        companyName="ИП 'ЭкоОгородник'"
        completionRate="98.7"
        transactions="56"
        minQuantity="2000"
        maxQuantity="4000"
        pricePerKg="5000,75"
      />
      <ProductCardOffer
        companyName="ИП 'ЭкоОгородник'"
        completionRate="98.7"
        transactions="56"
        minQuantity="2000"
        maxQuantity="4000"
        pricePerKg="5000,75"
      />
      <ProductCardOffer
        companyName="ИП 'ЭкоОгородник'"
        completionRate="98.7"
        transactions="56"
        minQuantity="2000"
        maxQuantity="4000"
        pricePerKg="5000,75"
      />
      <ProductCardOffer
        companyName="ИП 'ЭкоОгородник'"
        completionRate="98.7"
        transactions="56"
        minQuantity="2000"
        maxQuantity="4000"
        pricePerKg="5000,75"
      />
    </View>
  );
};

export default ProductCardPage;
