import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  Image,
} from "react-native";
import { GoBackButton } from "../../../components/GoBackButton";
import colors from "../../../styles/colors";
import fonts from "../../../styles/fonts";
import { useNavigation } from "@react-navigation/native";
import StackContext from "../../../contexts/Stack";
import { StatusBar } from "react-native";
import { SafeZoneView, SimpleText } from "../../../styles/Theme";

export function AboutUsSettings() {
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
              Sobre nós
            </Text>
          </View>
          <View style={styles.photoContainer}>
            <Image
              style={styles.photo}
              source={require("../../../assets/aboutUS.png")}
            />
          </View>
          <View style={styles.text}>
            <Text
              style={{
                color: isWhiteMode ? colors.whiteLight : colors.white,
                textAlign: "justify",
                fontFamily: fonts.subtitle,
                lineHeight: 20,
              }}
            >
              {"  "}Tivemos a ideia do Risum no ano de 2020, durante a pandemia,
              na tentativa de encontrar uma maneira de entreter os usuários
              online.{"\n "}O design do aplicativo e as suas funcionalidades
              oferecidas sofreram diversas alterações ao longo do tempo, até que
              a sua atual aparência e interface foram finalizadas com a
              conclusão do PDTCC em dezembro de 2021.{"\n   "}Foi uma longa
              jornada até descobrirmos o potencial que a hiena poderia
              demonstrar aos seus usuários e desenvolvedores.{"\n   "}
              Esperamos que gostem do Apps, o grupo Risum agradece pelo seu
              apoio ;){"\n   "}O grupo: Camilly Rosaboni, Eduardo Guedes,
              Gabriel Kato, Luiz Felipe e Rodrigo Marcato (3ºDS - 2021)
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
