import { Dimensions, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { fetchTypeslist } from "../../src/services/UserProfileService";
import { useEffect, useState } from "react";
import { useAuth } from "../../app/context/AuthContext";

const width = Dimensions.get("window").width;
const cardWidth = (width * 271) / 375;
const cardHeight = (cardWidth * 155) / 271;
const cardminPadding = (cardWidth * 10) / 271;
const cardmaxPadding = (cardWidth * 20) / 271;
const verticalDistance = (cardWidth * 10) / 271;

export const FieldCard = ({ data, productData, style }) => {
  const { logout, getAuthToken } = useAuth();
  const [typesList, setTypesList] = useState([]);

  const getTypes = async () => {
    try {
      const token = await getAuthToken();
      const fetchedTypesList = await fetchTypeslist(token);
      setTypesList(fetchedTypesList);
    } catch (error) {
      console.error(error);
      showMessage({
        message: error.message || "An error occurred",
        type: "danger",
        icon: "danger",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    getTypes();
  }, []);

  const matchedProduct = productData.find(
    (product) => product.field === data.id
  );
  const matchedType = typesList.find(
    (type) => type.id === matchedProduct?.type
  );
  console.log("MATCHPRODUCT: ", matchedProduct);
  console.log("MATCH: ", matchedType);

  return (
    <View
      style={{
        width: cardWidth,
        height: cardHeight,
        borderRadius: 20,
        backgroundColor: style.backgroundColor,
        marginTop: verticalDistance,
        paddingRight: cardminPadding,
        paddingTop: cardminPadding,
        paddingBottom: cardmaxPadding,
        paddingLeft: cardmaxPadding,
        flex: 1,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <View
          style={{
            backgroundColor: RgbaColors.TERTIARY_BACKGROUND_BLACK,
            paddingHorizontal: verticalDistance,
            paddingVertical: 3,
            borderRadius: 40,
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
            Рассмотрение
          </Text>
        </View>
      </View>

      <View>
        <Text style={{ color: "white", fontSize: 12, fontWeight: "700" }}>
          Поле №{data.id}
        </Text>
      </View>

      <View style={{ justifyContent: "center", flex: 1 }}>
        <View>
          <Text style={{ color: "white", fontSize: 12, fontWeight: "600" }}>
            Культура
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
            {matchedType ? matchedType.name + " " : ""}
          </Text>
          <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
            {matchedType ? matchedProduct.sort : ""}
          </Text>
        </View>
      </View>

      <View style={{ justifyContent: "flex-end", flex: 1 }}>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "500" }}>
          {data.cadastral_number}
        </Text>
      </View>
    </View>
  );
};
