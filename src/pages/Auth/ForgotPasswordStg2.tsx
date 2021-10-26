import React, { useContext } from "react";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

import { useNavigation } from "@react-navigation/core";
import { ConfirmButton } from "../../components/ConfirmButton";
import StackContext from "../../contexts/Stack";

import Lottie from "lottie-react-native";
import letter from "../../assets/lotties/letter.json";
import letterLight from "../../assets/lotties/letterLight.json";
import { SafeZoneView } from "../../styles/Theme";

export function ForgotPasswordStg2() {
  const navigation = useNavigation(); // Navigation between screen

  // Theme
  const { isWhiteMode } = useContext(StackContext);

  return (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <View style={styles.container}>
          <Text
            style={[
              styles.title,
              { color: isWhiteMode ? colors.greenLight : colors.green },
            ]}
          >
            Sucesso!
          </Text>
          {isWhiteMode ? (
            <Lottie
              style={styles.letter}
              resizeMode="contain"
              autoSize
              source={letterLight}
              autoPlay
              loop
            />
          ) : (
            <Lottie
              style={styles.letter}
              resizeMode="contain"
              autoSize
              source={letter}
              autoPlay
              loop
            />
          )}
          <Text
            style={[
              styles.text,
              { color: isWhiteMode ? colors.whiteLight : colors.white },
            ]}
          >
            Um email foi enviado para você, siga suas instruções para redefinir
            a senha da sua Conta Risum
          </Text>
          <View style={styles.buttonContainer}>
            <ConfirmButton
              title="Entendi"
              theme={isWhiteMode}
              onPress={() => {
                navigation.navigate("Welcome");
              }}
            />
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 50,
    fontFamily: fonts.heading,
    textAlign: "center",
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.text,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  emoji: {
    fontSize: 86,
    color: colors.text,
  },
  letter: {
    height: 250,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 30,
  },
});
