import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableHighlight,
  View,
  StyleSheet,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import RgbaColors from "../../../RgbaColors";

const Registration = ({
  onChangeText,
  onChangePassword,
  onRegister,
  onSelectedCompany,
}) => {
  const SelectData = [
    { text: "IP", title: "ИП" },
    { text: "KX", title: "КРЕСТЬЯНСКОЕ ХОЗЯЙСТВО" },
    { text: "TOO", title: "TOO" },
    { text: "FZ", title: "ФИЗИЧЕСКОЕ ЛИЦО" },
  ];
  const [step, setStep] = useState(1);
  const [orgName, setOrgName] = useState();

  function ProceedButtonComponent() {
    return step == 1 ? (
      <View style={styles.touchableButton}>
        <TouchableHighlight
          style={styles.proceedButton}
          onPress={handleNextStep}
        >
          <Text style={styles.registerButtonText}>Продолжить</Text>
        </TouchableHighlight>
      </View>
    ) : step == 2 ? (
      <View style={styles.touchableButton}>
        <TouchableHighlight style={styles.backButton} onPress={handlePrevStep}>
          <Text style={styles.registerButtonText}>Назад</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.proceedButton}
          onPress={handleNextStep}
        >
          <Text style={styles.registerButtonText}>Продолжить</Text>
        </TouchableHighlight>
      </View>
    ) : (
      <View style={styles.touchableButton}>
        <TouchableHighlight style={styles.backButton} onPress={handlePrevStep}>
          <Text style={styles.registerButtonText}>Назад</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.proceedButton} onPress={onRegister}>
          <Text style={styles.registerButtonText}>Зарегистрироваться</Text>
        </TouchableHighlight>
      </View>
    );
  }

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  return (
    <View style={styles.container}>
      {step === 1 ? (
        <>
          <Text style={[{ fontWeight: 700 }, styles.field_heading]}>
            IIN/BIN
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => onChangeText("username", text)} // Pass the field name and text
            autoComplete="username"
            inputMode="numeric"
          />
          <Text
            style={[{ fontWeight: 700, paddingTop: 16 }, styles.field_heading]}
          >
            Тип Юридического Лица
          </Text>
          <SelectDropdown
            data={SelectData}
            onSelect={(selectedItem, index) => {
              onSelectedCompany(selectedItem.text);
              setOrgName(selectedItem.text);
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.title) || "Не выбрано"}
                  </Text>
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

          <ProceedButtonComponent />
        </>
      ) : step === 2 ? (
        <>
          {orgName == "FZ" ? (
            onChangeText("companyName", "Физическое лицо")
          ) : (
            <>
              <Text style={[{ fontWeight: 700 }, styles.field_heading]}>
                Наименование Организации
              </Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => onChangeText("companyName", text)} // New field
                autoComplete="companyName"
              />
            </>
          )}

          <Text
            style={[{ paddingTop: 16, fontWeight: 700 }, styles.field_heading]}
          >
            Фамилия
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => onChangeText("lastName", text)} // Pass the field name and text
            autoComplete="lastName"
          />
          <Text
            style={[{ paddingTop: 16, fontWeight: 700 }, styles.field_heading]}
          >
            Имя
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => onChangeText("firstName", text)} // Pass the field name and text
            autoComplete="firstName"
          />

          <ProceedButtonComponent />
        </>
      ) : (
        <>
          <Text style={[{ fontWeight: 700 }, styles.field_heading]}>
            Пароль
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => onChangePassword(text)}
            secureTextEntry
          />
          <Text
            style={[{ paddingTop: 16, fontWeight: 700 }, styles.field_heading]}
          >
            Подтвердите пароль
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => onChangePassword(text)}
            secureTextEntry
          />
          <ProceedButtonComponent />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-evenly",
    paddingTop: 25,
  },
  textInput: {
    borderColor: "black",
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    // borderWidth: 1,
    width: "100%",
    borderRadius: 50,
    height: 50,
    paddingLeft: 25,
    color: "white",
    fontSize: 14,
  },
  registerButton: {
    height: 50,
    backgroundColor: "#18161C",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    height: 50,
    flex: 20,
    backgroundColor: RgbaColors.TERTIARY_TEXT_WHITE,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  proceedButton: {
    height: 50,
    flex: 32,
    backgroundColor: RgbaColors.SECONDARY_PURPLE,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  registerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  touchableButton: {
    borderRadius: 50,
    flex: 1,
    gap: 5,
    flexDirection: "row",
    paddingTop: 45,
  },
  field_heading: {
    color: "white",
    paddingLeft: 20,
    paddingBottom: 6,
    fontSize: 12,
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

export default Registration;
