import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import RgbaColors from "../../RgbaColors";
import IMAGES from "../../Assets";
import { CultureTabSelect } from "./CultureTabSelect";
import SelectDropdown from "react-native-select-dropdown";
import { useAuth } from "../../app/context/AuthContext";
import { createFieldUser } from "../../src/services/UserProfileService";

const screenWidth = Dimensions.get("window").width;

const CreateSubsidyFormFields = () => {
  const { logout, getAuthToken } = useAuth();
  const createField = async () => {
    try {
      const token = await getAuthToken(); // Get the token from AuthContext
      const data = await createFieldUser(token); // Fetch profile data
      console.log(data);
      setProfile(data);
    } catch (error) {
      console.error("Error fetching field:", error);
      Alert.alert("Error", "Failed to fetch field. Please try again.");
    }
  };
  const TabItems = [
    { label: "Растительная" },
    { label: "Мясная" },
    { label: "Кормовая" },
  ];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleOnChangeText = (text) => {
    console.log(text);
  };
  const handleTabChange = (index) => {
    setSelectedIndex(index);
    console.log("Selected tab index:", index);
  };
  return (
    <ScrollView
      style={{
        backgroundColor:
          Platform.OS === "ios"
            ? RgbaColors.PRIMARY_BLACK_BACKGROUND
            : RgbaColors.PRIMARY_BLACK_BACKGROUND_ANDROID,
        paddingTop: Platform.OS === "ios" ? 10 : 5,
      }}
    >
      <View
        style={{
          flex: 1,
          paddingTop: 30,
          flexDirection: "row",
          flexWrap: "wrap",
          paddingHorizontal: 35,
          gap: 15,
        }}
      >
        <InputFieldCreator
          title={"Город"}
          onChangeText={handleOnChangeText}
          image={IMAGES.DROPDOWNICON}
        />
        <InputFieldCreator
          title={"Область"}
          onChangeText={handleOnChangeText}
          image={IMAGES.DROPDOWNICON}
        />
        <InputFieldCreator
          title={"Район"}
          onChangeText={handleOnChangeText}
          image={IMAGES.PEN}
        />
      </View>

      <View
        style={{
          flex: 1,
          paddingTop: 15,
          flexDirection: "row",
          flexWrap: "wrap",
          paddingHorizontal: 35,
          gap: 15,
        }}
      >
        <InputFieldCreator
          title={"Землепользование"}
          onChangeText={handleOnChangeText}
          image={IMAGES.DROPDOWNICON}
        />
        <InputFieldCreator
          title={"Кадастр"}
          onChangeText={handleOnChangeText}
          image={IMAGES.PEN}
        />
        <InputFieldCreator
          title={"Площадь"}
          onChangeText={handleOnChangeText}
          image={IMAGES.PEN}
        />
        <InputFieldCreator
          title={"Общая площадь"}
          onChangeText={handleOnChangeText}
          image={IMAGES.PEN}
        />
      </View>
      <View
        style={{
          flex: 1,
          paddingTop: 30,
          flexWrap: "wrap",
          paddingHorizontal: 35,
          gap: 10,
        }}
      >
        <View>
          <Text
            style={{
              color: "white",
              fontWeight: "700",
              fontSize: 12,
              marginHorizontal: 12,
            }}
          >
            Установите адрес
          </Text>
        </View>

        <View>
          <Image
            source={IMAGES.MAPILLUSTRATION}
            resizeMode="contain"
            style={{
              width: screenWidth - 70,
              height: ((screenWidth - 70) * 155) / 305,
            }}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          paddingTop: 30,
          // flexWrap: "wrap",
          paddingHorizontal: 35,
          gap: 10,
        }}
      >
        <CultureTabSelect
          data={TabItems}
          selectedIndex={selectedIndex}
          onChange={handleTabChange}
        />
      </View>
      <View
        style={{
          flex: 1,
          paddingTop: 15,
          flexDirection: "row",
          flexWrap: "wrap",
          paddingHorizontal: 35,
          gap: 15,
          paddingBottom: 40,
        }}
      >
        <InputFieldCreator
          title={"Семейство"}
          onChangeText={handleOnChangeText}
          image={IMAGES.DROPDOWNICON}
        />
        <InputFieldCreator
          title={"Культура"}
          onChangeText={handleOnChangeText}
          image={IMAGES.DROPDOWNICON}
        />
        <InputFieldCreator
          title={"Сорт"}
          onChangeText={handleOnChangeText}
          image={IMAGES.PEN}
        />
        <InputFieldCreator
          title={"Фракция"}
          onChangeText={handleOnChangeText}
          image={IMAGES.DROPDOWNICON}
        />
      </View>
    </ScrollView>
  );
};

const InputFieldCreator = ({ title, onChangeText, image }) => {
  const { logout, getAuthToken } = useAuth();
  const getRegion = async () => {
    try {
      const token = await getAuthToken(); // Get the token from AuthContext
      const data = await createFieldUser(token); // Fetch profile data
      console.log(data);
      setProfile(data);
    } catch (error) {
      console.error("Error fetching field:", error);
      Alert.alert("Error", "Failed to fetch field. Please try again.");
    }
  };
  const SelectData = [
    { text: "IP", title: "ИП" },
    { text: "KX", title: "КРЕСТЬЯНСКОЕ ХОЗЯЙСТВО" },
    { text: "TOO", title: "TOO" },
    { text: "FZ", title: "ФИЗИЧЕСКОЕ ЛИЦО" },
  ];
  const width = Dimensions.get("window").width;
  return (
    <View style={{ gap: 5, width: ((screenWidth - 85) / 290) * 145 }}>
      <View>
        <Text
          style={{
            color: "white",
            fontWeight: "700",
            fontSize: 12,
            marginHorizontal: 12,
          }}
        >
          {title}
        </Text>
      </View>

      <SelectDropdown
        data={SelectData}
        onSelect={(selectedItem, index) => {
          onSelectedCompany(selectedItem.text);
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.title) || "Не выбрано"}
              </Text>
              <View
                style={{ justifyContent: "center", alignItems: "flex-end" }}
              >
                <Image
                  source={image}
                  resizeMode="contain"
                  style={{ tintColor: "white", width: 20, height: 20 }}
                />
              </View>
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && {
                  backgroundColor: "rgba(140, 137, 250, 0.5)",
                  height: 50,
                  borderRadius: 50,
                }),
              }}
            >
              <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    color: "white",
    fontWeight: "500",
    fontSize: 14,
    // marginHorizontal: 12,
    marginVertical: 10,
  },
  dropdownButtonStyle: {
    // width: 200,
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    flex: 1,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "rgba(31, 31, 40, 0.9)",
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  dropdownItemStyle: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "white",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});

export default CreateSubsidyFormFields;
