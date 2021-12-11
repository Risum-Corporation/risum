import React, { useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, Platform } from "react-native";
import { GoBackButton } from "../../../components/GoBackButton";
import colors from "../../../styles/colors";
import fonts from "../../../styles/fonts";
import { useNavigation } from "@react-navigation/native";
import StackContext from "../../../contexts/Stack";
import { StatusBar } from "react-native";
import { SafeZoneView } from "../../../styles/Theme";

export function RisumPoliciesSettings() {
  const navigation = useNavigation();

  // Theme
  const { isWhiteMode } = useContext(StackContext);

  return (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <View>
          <GoBackButton
            theme={isWhiteMode}
            onPress={() => navigation.goBack()}
          />
          <View style={styles.heading}>
            <Text
              style={[
                styles.title,
                isWhiteMode
                  ? { color: colors.greenLight }
                  : { color: colors.green },
              ]}
            >
              Políticas Risum
            </Text>
          </View>
          <View style={styles.text}>
            <Text
              style={{
                color: isWhiteMode ? colors.whiteLight : colors.white,
                textAlign: "center",
                fontFamily: fonts.subtitle,
                lineHeight: 30,
              }}
            >
              1. Não terás outros deuses além de mim {"\n"}
              2. Não farás para ti nenhum ídolo {"\n"}
              3. Não tomarás em vão o nome do Senhor {"\n"}
              4. Lembra-te do dia de sábado, para santificá-lo {"\n"}
              5. Honra teu pai e tua mãe. {"\n"}
              6. Não matarás {"\n"}
              7. Não adulterarás {"\n"}
              8. Não furtarás {"\n"}
              9. Não darás falso testemunho contra o teu próximo {"\n"}
              10. Não cobiçarás
            </Text>
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  heading: {
    marginHorizontal: 50,
  },
  title: {
    fontFamily: fonts.heading,
    fontWeight: "bold",
    fontSize: 25,
    marginTop: "30%",
  },
  options: {
    marginTop: 50,
  },
  subtitle: {
    color: colors.white,
    fontFamily: fonts.subtitle,
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
  },
  photo: {
    width: 300,
    height: 190,
    borderRadius: 10,
  },
  photoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  text: {
    marginHorizontal: 50,
    marginTop: 30,
  },
});
