import React, { useContext } from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

import { useNavigation } from "@react-navigation/core";
import { ConfirmButton } from "../../components/ConfirmButton";
import StackContext from "../../contexts/Stack";

export function ForgotPasswordStg2() {
  const navigation = useNavigation(); // Navigation between screen

  // Theme
  const { isWhiteMode } = useContext(StackContext);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isWhiteMode
            ? colors.backgroundLight
            : colors.background,
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: isWhiteMode ? colors.greenLight : colors.green },
        ]}
      >
        Sucesso!
      </Text>
      <Text style={styles.emoji}>😄</Text>
      <Text
        style={[
          styles.text,
          { color: isWhiteMode ? colors.textLight : colors.text },
        ]}
      >
        Um email foi enviado para você, siga suas instruções para redefinir a
        senha da sua Conta Risum
      </Text>

      <ConfirmButton
        title="Entendi"
        theme={isWhiteMode}
        onPress={() => {
          navigation.navigate("Welcome");
        }}
      />
    </SafeAreaView>
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
    fontFamily: fonts.heading,
    textAlign: "justify",
  },
  emoji: {
    fontSize: 86,
    color: colors.text,
  },
});
