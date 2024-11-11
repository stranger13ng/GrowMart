import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Platform,
  Alert,
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
import { useRoute } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

const CreateSubsidyFormFields = () => {
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const { user } = route.params; // Get user data from navigation params
  const { getAuthToken } = useAuth();
  const [selectedIndex, setSelectedIndex] = useState(0);
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
    user: "",
    field: "",
  });
  const [selectData, setSelectData] = useState([]);
  const [selectField, setSelectField] = useState([]);
  const [selectFamily, setSelectFamily] = useState([]);
  const [selectType, setSelectType] = useState([]);
  const { login, logout, register, createField, createProduct } = useAuth();
  const filteredSelectTypes = selectType.filter(
    (type) => type.family.id === formData.family
  );
  const handleFieldCreation = async () => {
    const {
      city,
      region,
      district,
      landUsage,
      cadastre,
      area,
      totalArea,
      user,
    } = formData; // Destructure from formData

    // Validate if all required fields are filled
    if (
      !city ||
      !region ||
      !district ||
      !landUsage ||
      !cadastre ||
      !area ||
      !totalArea ||
      !user
    ) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    setLoading(true); // Show loading indicator

    try {
      // Get the token from AuthContext
      const token = await getAuthToken();

      // Call the API to create the field with the provided data
      await createField(
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

      // Show success message
      Alert.alert("Success", "Field created successfully");

      // Optionally reset the form data
      resetFormData();

      // Navigate to another screen or reset specific states here if needed
      // Example: navigation.goBack();
    } catch (error) {
      console.error("Field creation error:", error);

      // Provide more detailed error feedback
      Alert.alert(
        "Error",
        "There was an issue with your submission. Please try again."
      );
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  // Function to reset the form data
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
      field: "",
    });
  };

  const handleProductCreation = async () => {
    const { family, culture, sort, fraction, field } = formData; // Destructure from formData

    // Validate if all required fields are filled
    if (!family || !culture || !sort || !fraction || !field) {
      Alert.alert("Error", "Please fill in all required fields.");
      return; // Exit the function early if validation fails
    }

    setLoading(true); // Show loading indicator
    try {
      const token = await getAuthToken(); // Get the token from AuthContext

      // Log the data to be sent (optional)
      console.log("Creating product with data:", {
        family,
        culture,
        sort,
        fraction,
        field,
      });

      // Call the API to create the product
      const response = await createProduct(
        family,
        culture,
        sort,
        fraction,
        field,
        token
      );

      // Assuming the API response is successful, you can proceed with next steps
      Alert.alert("Product Created Successfully");

      // Optionally, reset the form or navigate to another screen here if needed
      setFormData({
        family: "",
        culture: "",
        sort: "",
        fraction: "",
        field: "",
      });

      // Optionally, navigate or update UI after success
    } catch (error) {
      console.error("handleProductCreation error:", error);
      Alert.alert(
        "Product Creation Error",
        error.message ||
          "There was an issue with your submission. Please try again."
      );
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  const setUserId = () => {
    // Ensure user exists and has an 'id' field
    if (user && user.id) {
      handleOnChangeText("user", user.id);
    }
  };

  useEffect(() => {
    if (user) {
      setUserId(); // Call function to set user ID
    }
  }, [user]);

  useEffect(() => {
    console.log("Form Data Updated:", formData); // This will log the updated form data
  }, [formData]); // Track changes to formData

  useEffect(() => {
    const fetchRegion = async () => {
      try {
        const token = await getAuthToken(); // Get the token from AuthContext
        const data = await fetchRegionlist(token); // Fetch region data
        setSelectData(data); // Set the region data to state
      } catch (error) {
        console.error("Error fetching Region:", error);
        Alert.alert("Error", "Failed to fetch Region. Please try again.");
      }
    };
    fetchRegion(); // Call the fetch function on mount
  }, [getAuthToken]);
  useEffect(() => {
    const fetchFields = async () => {
      try {
        const token = await getAuthToken(); // Get the token from AuthContext
        const data = await fetchFieldslist(token); // Fetch region data
        setSelectField(data); // Set the region data to state
        console.log(data);
      } catch (error) {
        console.error("Error fetching Region:", error);
        Alert.alert("Error", "Failed to fetch Region. Please try again.");
      }
    };

    fetchFields(); // Call the fetch function on mount
  }, [getAuthToken]);

  useEffect(() => {
    const fetchFamilies = async () => {
      try {
        const token = await getAuthToken(); // Get the token from AuthContext
        const data = await fetchFamilylist(token); // Fetch region data
        setSelectFamily(data); // Set the region data to state
        // console.log(data);
      } catch (error) {
        console.error("Error fetching Region:", error);
        Alert.alert("Error", "Failed to fetch Region. Please try again.");
      }
    };

    fetchFamilies(); // Call the fetch function on mount
  }, [getAuthToken]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const token = await getAuthToken(); // Get the token from AuthContext
        const data = await fetchTypeslist(token); // Fetch region data
        setSelectType(data); // Set the region data to state
        // console.log(data);
      } catch (error) {
        console.error("Error fetching Region:", error);
        Alert.alert("Error", "Failed to fetch Region. Please try again.");
      }
    };

    fetchTypes(); // Call the fetch function on mount
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

  const handleOnChangeText = (key, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
    // console.log("Form Data Updated:", formData);
  };

  const handleTabChange = (index) => {
    setSelectedIndex(index);
    // console.log("Selected tab index:", index);
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
        <TouchableOpacity style={styles.button} onPress={handleFieldCreation}>
          <Text style={{ color: "#fff" }}>REGISTER FIELD</Text>
        </TouchableOpacity>
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
        <InputFieldCreator
          title={"Поле"}
          keyName={"field"}
          value={formData.field}
          onChangeText={handleOnChangeText}
          image={IMAGES.DROPDOWNICON}
          selectData={selectField}
        />
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
        <TouchableOpacity style={styles.button} onPress={handleProductCreation}>
          <Text style={{ color: "#fff" }}>REGISTER CULTURE</Text>
        </TouchableOpacity>
      </View>
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
