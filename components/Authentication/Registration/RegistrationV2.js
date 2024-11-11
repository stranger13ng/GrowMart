import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableHighlight,
  View,
  StyleSheet,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";

const RegistrationV2 = ({ onRegister, onSelectedCompany }) => {
  const SelectData = [
    { text: "IP", title: "ИП" },
    { text: "KX", title: "КРЕСТЬЯНСКОЕ ХОЗЯЙСТВО" },
    { text: "TOO", title: "TOO" },
    { text: "FZ", title: "ФИЗИЧЕСКОЕ ЛИЦО" },
  ];
  const [step, setStep] = useState(1);

  // State variables for each field
  const [iinBin, setIinBin] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
            value={iinBin}
            onChangeText={setIinBin}
            autoComplete="username"
            inputMode="numeric"
          />
          <Text
            style={[{ paddingTop: 16, fontWeight: 700 }, styles.field_heading]}
          >
            Фамилия
          </Text>
          <TextInput
            style={styles.textInput}
            value={lastName}
            onChangeText={setLastName}
            autoComplete="lastName"
          />
          <Text
            style={[{ paddingTop: 16, fontWeight: 700 }, styles.field_heading]}
          >
            Имя
          </Text>
          <TextInput
            style={styles.textInput}
            value={firstName}
            onChangeText={setFirstName}
            autoComplete="firstName"
          />

          <View style={styles.touchableButton}>
            <TouchableHighlight
              style={styles.registerButton}
              onPress={handleNextStep}
            >
              <Text style={styles.registerButtonText}>Продолжить</Text>
            </TouchableHighlight>
          </View>
        </>
      ) : step === 2 ? (
        <>
          <Text style={[{ fontWeight: 700 }, styles.field_heading]}>
            Наименование Организации
          </Text>
          <TextInput
            style={styles.textInput}
            value={companyName}
            onChangeText={setCompanyName}
            autoComplete="companyName"
          />
          <Text
            style={[{ paddingTop: 16, fontWeight: 700 }, styles.field_heading]}
          >
            Тип Юридического Лица
          </Text>

          <SelectDropdown
            data={SelectData}
            onSelect={(selectedItem) => {
              setSelectedCompany(selectedItem.text);
              onSelectedCompany(selectedItem.text);
            }}
            renderButton={(selectedItem) => (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.title) || "Не выбрано"}
                </Text>
              </View>
            )}
            renderItem={(item, index, isSelected) => (
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
            )}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />

          <View style={styles.touchableButton}>
            <TouchableHighlight
              style={styles.registerButton}
              onPress={handleNextStep}
            >
              <Text style={styles.registerButtonText}>Продолжить</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={[
                styles.registerButton,
                { marginTop: 10, backgroundColor: "gray" },
              ]}
              onPress={handlePrevStep}
            >
              <Text style={styles.registerButtonText}>Назад</Text>
            </TouchableHighlight>
          </View>
        </>
      ) : (
        <>
          <Text style={[{ fontWeight: 700 }, styles.field_heading]}>
            Пароль
          </Text>
          <TextInput
            style={styles.textInput}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Text
            style={[{ paddingTop: 16, fontWeight: 700 }, styles.field_heading]}
          >
            Подтвердите пароль
          </Text>
          <TextInput
            style={styles.textInput}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <View style={styles.touchableButton}>
            <TouchableHighlight
              style={styles.registerButton}
              onPress={() =>
                onRegister({
                  iinBin,
                  lastName,
                  firstName,
                  companyName,
                  selectedCompany,
                  password,
                  confirmPassword,
                })
              }
            >
              <Text style={styles.registerButtonText}>Зарегистрироваться</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={[
                styles.registerButton,
                { marginTop: 10, backgroundColor: "gray" },
              ]}
              onPress={handlePrevStep}
            >
              <Text style={styles.registerButtonText}>Назад</Text>
            </TouchableHighlight>
          </View>
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
    borderWidth: 1,
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
  registerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  touchableButton: {
    borderRadius: 50,
    paddingTop: 20,
  },
  field_heading: {
    color: "white",
    paddingLeft: 20,
    paddingBottom: 6,
    fontSize: 12,
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
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
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
});

export default RegistrationV2;
