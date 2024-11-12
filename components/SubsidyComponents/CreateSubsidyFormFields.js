import React, {
  useState,
  useEffect,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import RgbaColors from "../../RgbaColors";
import IMAGES from "../../Assets";
import { CultureTabSelect } from "./CultureTabSelect";
import SelectDropdown from "react-native-select-dropdown";
import { useAuth } from "../../app/context/AuthContext";
import {
  fetchFamilylist,
  fetchFieldslist,
  fetchRegionlist,
  fetchTypeslist,
} from "../../src/services/UserProfileService";
import { useNavigation, useRoute } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";

const screenWidth = Dimensions.get("window").width;

const CreateSubsidyFormFields = () => {
  const route = useRoute();
  const { user } = route.params;
  const formDataRef = useRef(formData); // Create a ref to track formData

  const [formData, setFormData] = useState({
    city: "",
    region: "",
    district: "",
    landUsage: "",
    cadastre: "",
    area: "",
    totalArea: "",
    family: "",
    culture: "",
    sort: "",
    fraction: "",
    user: user ? user.id : "",
    // field: "",
  });
  const navigation = useNavigation();
  const handleOnChangeText = (key, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
    // console.log("Form Data Updated:", formData);
  };
  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => handleFieldCreation(formDataRef.current)} // Pass ref.current
          style={{
            backgroundColor: RgbaColors.PRIMARY_PURPLE,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 25,
          }}
        >
          <Text style={{ fontSize: 16, color: "white", fontWeight: 600 }}>
            Создать
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  const [loading, setLoading] = useState(false);

  // Get user data from navigation params
  const { getAuthToken } = useAuth();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [selectData, setSelectData] = useState([]);
  const [selectField, setSelectField] = useState([]);
  const [selectFamily, setSelectFamily] = useState([]);
  const [selectType, setSelectType] = useState([]);
  const { login, logout, register, createField, createProduct } = useAuth();
  const filteredSelectTypes = selectType.filter(
    (type) => type.family.id === formData.family
  );

  useEffect(() => {
    if (user && user.id) {
      setFormData((prevData) => ({
        ...prevData,
        user: user.id, // Ensure user id is correctly set in formData
      }));
    }
  }, [user]);

  const handleFieldCreation = async (formData) => {
    const {
      city,
      region,
      district,
      landUsage,
      cadastre,
      area,
      totalArea,
      family,
      culture,
      sort,
      fraction,
      user,
    } = formData;
    console.log("Form Data Inside Creation:", formData);
    const requiredFields = [
      city,
      region,
      district,
      landUsage,
      cadastre,
      area,
      totalArea,
      family,
      culture,
      sort,
      fraction,
      user,
    ];
    console.log(requiredFields);
    // Validate if all required fields are filled and user is defined
    if (!user) {
      showMessage({
        message: "Error: User ID is missing.",
        type: "danger",
        icon: "danger",
        duration: 3000,
      });
      return;
    }

    if (requiredFields.some((field) => !field)) {
      showMessage({
        message: "Error: Please fill in all required fields.",
        type: "danger",
        icon: "danger",
        duration: 3000,
      });
      return;
    }

    setLoading(true); // Show loading indicator

    try {
      // Fetch the token
      let token;
      try {
        token = await getAuthToken();
      } catch (error) {
        console.error("Error fetching auth token:", error);
        showMessage({
          message: `Error: Unable to fetch auth token. ${error.message}`,
          type: "danger",
          icon: "danger",
          duration: 3000,
        });
        return;
      }

      // Create the field first
      let responseData;
      try {
        responseData = await createField(
          city,
          region,
          district,
          landUsage,
          cadastre,
          area,
          totalArea,
          user,
          token
        );
        // console.log("Field created successfully", responseData);
      } catch (error) {
        console.error("Error creating field:", error);
        showMessage({
          message: `Error: Unable to create field. ${error.message}`,
          type: "danger",
          icon: "danger",
          duration: 3000,
        });
        return;
      }

      const field = responseData.id; // Save the field ID returned from createField
      // console.log("Field ID:", field);

      // Now, proceed with creating the product using the newly created field ID
      let productResponse;
      try {
        productResponse = await createProduct(
          family,
          culture,
          sort,
          fraction,
          field, // Pass the field ID from the createField response
          token
        );
        // console.log("Product created with field ID:", productResponse.id);
      } catch (error) {
        console.error("Error creating product:", error);
        showMessage({
          message: `Error: Unable to create product. ${error.message}`,
          type: "danger",
          icon: "danger",
          duration: 3000,
        });
        return;
      }

      showMessage({
        message: "Field and product created successfully!",
        type: "success",
        icon: "success",
        duration: 3000, // Display for 3 seconds
        backgroundColor: "#28a745", // Green color for success
      });

      // Optionally reset the form data after successful creation
      resetFormData();
      navigation.goBack();
    } catch (error) {
      console.error("Unexpected error:", error);
      showMessage({
        message: `Error: Something went wrong. ${error.message}`,
        type: "danger",
        icon: "danger",
        duration: 3000,
      });
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  const resetFormData = () => {
    setFormData({
      city: "",
      region: "",
      district: "",
      landUsage: "",
      cadastre: "",
      area: "",
      totalArea: "",
      family: "",
      culture: "",
      sort: "",
      fraction: "",
      user: user ? user.id : "", // Reset user field
      field: "",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAuthToken();
        const regionData = await fetchRegionlist(token);
        setSelectData(regionData);

        const familyData = await fetchFamilylist(token);
        setSelectFamily(familyData);

        const typeData = await fetchTypeslist(token);
        setSelectType(typeData);
      } catch (error) {
        console.error("Error fetching data:", error);
        showMessage({
          message: "Error, failed to fetch data. Please try again.",
          type: "danger",
          icon: "danger",
          duration: 3000,
        });
      }
    };

    fetchData();
  }, [getAuthToken]);

  const TabItems = [
    { label: "Растительная" },
    { label: "Мясная" },
    { label: "Кормовая" },
  ];
  const SelectOwnershipDataDropdown = [
    { text: "1", title: "Собственник" },
    { text: "0", title: "Аренда" },
  ];
  const SelectFractionDropdown = [
    { text: "SM", title: "Малая" },
    { text: "MD", title: "Средняя" },
    { text: "XL", title: "Крупная" },
  ];

  const handleTabChange = (index) => {
    setSelectedIndex(index);
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
      <View style={styles.inputFieldsContainer}>
        <InputFieldCreator
          title={"Город"}
          keyName={"city"}
          value={formData.city}
          onChangeText={handleOnChangeText}
          image={IMAGES.PEN}
        />
        <InputFieldCreator
          title={"Область"}
          keyName={"region"}
          value={formData.region}
          onChangeText={handleOnChangeText}
          image={IMAGES.DROPDOWNICON}
          selectData={selectData}
        />
        <InputFieldCreator
          title={"Район"}
          keyName={"district"}
          value={formData.district}
          onChangeText={handleOnChangeText}
          image={IMAGES.PEN}
        />
      </View>

      <View style={styles.inputFieldsContainer}>
        <InputFieldCreator
          title={"Землепользование"}
          keyName={"landUsage"}
          value={formData.landUsage}
          onChangeText={handleOnChangeText}
          image={IMAGES.DROPDOWNICON}
          selectData={SelectOwnershipDataDropdown}
        />
        <InputFieldCreator
          title={"Кадастр"}
          keyName={"cadastre"}
          value={formData.cadastre}
          onChangeText={handleOnChangeText}
          image={IMAGES.PEN}
          inputKeyboard={"numeric"}
        />
        <InputFieldCreator
          title={"Площадь"}
          keyName={"area"}
          value={formData.area}
          onChangeText={handleOnChangeText}
          image={IMAGES.PEN}
        />
        <InputFieldCreator
          title={"Общая площадь"}
          keyName={"totalArea"}
          value={formData.totalArea}
          onChangeText={handleOnChangeText}
          image={IMAGES.PEN}
        />
      </View>

      <View style={styles.addressContainer}>
        <Text style={styles.label}>Установите адрес</Text>
        <Image
          source={IMAGES.MAPILLUSTRATION}
          resizeMode="contain"
          style={styles.mapImage}
        />
      </View>

      <View style={styles.tabSelectContainer}>
        <CultureTabSelect
          data={TabItems}
          selectedIndex={selectedIndex}
          onChange={handleTabChange}
        />
      </View>

      <View style={styles.inputFieldsContainer}>
        {/* <InputFieldCreator
          title={"Поле"}
          keyName={"field"}
          value={formData.field}
          onChangeText={handleOnChangeText}
          image={IMAGES.DROPDOWNICON}
          selectData={selectField}
        /> */}
        <InputFieldCreator
          title={"Семейство"}
          keyName={"family"}
          value={formData.family}
          onChangeText={handleOnChangeText}
          image={IMAGES.DROPDOWNICON}
          selectData={selectFamily}
        />
        <InputFieldCreator
          title={"Культура"}
          keyName={"culture"}
          value={formData.culture}
          onChangeText={handleOnChangeText}
          image={IMAGES.DROPDOWNICON}
          selectData={filteredSelectTypes}
        />
        <InputFieldCreator
          title={"Сорт"}
          keyName={"sort"}
          value={formData.sort}
          onChangeText={handleOnChangeText}
          image={IMAGES.PEN}
        />
        <InputFieldCreator
          title={"Фракция"}
          keyName={"fraction"}
          value={formData.fraction}
          onChangeText={handleOnChangeText}
          image={IMAGES.DROPDOWNICON}
          selectData={SelectFractionDropdown}
        />
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const InputFieldCreator = ({
  title,
  onChangeText,
  keyName,
  value,
  image,
  selectData,
  inputKeyboard,
}) => {
  return (
    <View style={styles.inputField}>
      <Text style={styles.label}>{title}</Text>

      {/* Conditionally render based on the props passed */}
      {selectData ? (
        // Dropdown menu
        <SelectDropdown
          data={selectData}
          onSelect={(selectedItem) => {
            // Select the correct property depending on the structure of the item
            onChangeText(keyName, selectedItem.text || selectedItem.id);
          }}
          renderButton={(selectedItem) => {
            // Default value when nothing is selected
            const displayText =
              selectedItem?.cadastral_number ||
              selectedItem?.region ||
              selectedItem?.title ||
              selectedItem?.name ||
              selectedItem?.id ||
              "Не выбрано";

            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>{displayText}</Text>
                <Image
                  source={image}
                  resizeMode="contain"
                  style={styles.dropdownButtonIconStyle}
                />
              </View>
            );
          }}
          renderItem={(item, isSelected) => {
            // Render dropdown item conditionally
            const displayText = item.cadastral_number
              ? `${item.city} ${item.cadastral_number} ${item.used_area}`
              : item.region || item.title || item.name;

            return (
              <View style={styles.dropdownItemStyle}>
                <Text style={styles.dropdownItemTxtStyle}>{displayText}</Text>
              </View>
            );
          }}
          dropdownStyle={styles.dropdownMenuStyle}
        />
      ) : (
        // Text input field if no selectData provided
        <View style={styles.textInput}>
          <TextInput
            style={styles.textInputField}
            value={value}
            onChangeText={(text) => onChangeText(keyName, text)}
            placeholder={title}
            inputMode={inputKeyboard}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
          />
          <Image
            source={image}
            resizeMode="contain"
            style={styles.dropdownButtonIconStyle}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: "white",
    fontWeight: "700",
    fontSize: 12,
    marginHorizontal: 12,
  },
  inputFieldsContainer: {
    flex: 1,
    paddingTop: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 35,
    gap: 15,
  },
  inputField: {
    gap: 5,
    width: (screenWidth - 85) / 2,
  },
  addressContainer: {
    flex: 1,
    paddingTop: 30,
    flexWrap: "wrap",
    paddingHorizontal: 35,
    gap: 10,
  },
  mapImage: {
    width: screenWidth - 70,
    height: ((screenWidth - 70) * 155) / 305,
  },
  tabSelectContainer: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 35,
    gap: 10,
  },
  dropdownButtonStyle: {
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  textInput: {
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    color: "white",
  },
  textInputField: {
    height: 50,
    color: "white",
    flex: 1,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
  },
  dropdownButtonIconStyle: {
    width: 20,
    height: 20,
    tintColor: "white",
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
  button: {
    backgroundColor: "#FF6347", // You can change the color
    padding: 10,
    alignItems: "center",
    marginTop: 20,
    borderRadius: 5,
  },
});

export default CreateSubsidyFormFields;
