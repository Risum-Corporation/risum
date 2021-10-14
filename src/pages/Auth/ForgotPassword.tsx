import React, { useContext } from "react";
import { SafeAreaView, Text, View, StyleSheet, TextInput } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { ConfirmButton } from "../../components/ConfirmButton"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import StackContext from "../../contexts/Stack";

import firebase from "../../database/firebaseConnection";

export function ForgotPasswordStg1() {
  const [email, setEmail] = useState<string>();
  const [isEmailOrUsernameInvalid, setIsEmailOrUsernameInvalid] =
    useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const { isWhiteMode } = useContext(StackContext);

  function handleEmailInputChange(value: string) {
    setEmail(value);
  }

  async function handleConfirm() {
    if (!email) {
      return setIsEmailOrUsernameInvalid(true);
    }

    await firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(async () => {
        await AsyncStorage.setItem("@risum:email", email);
      })
      .catch((error) => {
        setIsEmailOrUsernameInvalid(true);

        if (error.code === "auth/invalid-email") {
          setErrorMessage(`Email inválido`);
        } else if (error.code === "auth/user-not-found") {
          setErrorMessage(`Email não encontrado`);
        } else {
          setErrorMessage(
            "Não foi possível salvar o seu e-mail, tente novamente mais tarde"
          );
        }
      });
  }

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
      <View style={styles.wrapper}>
        <View style={styles.heading}>
          <Text style={styles.title}>Digite seu{"\n"}Email</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            placeholder="usuario@mail.com"
            placeholderTextColor={colors.placeholderText}
            style={[
              styles.input,
              { borderTopRightRadius: 8, borderTopLeftRadius: 8 },
            ]}
            onChangeText={handleEmailInputChange}
          />
          {isEmailOrUsernameInvalid && (
            <Text style={styles.redAdvertisement}>{errorMessage}</Text>
          )}
        </View>
        <View style={styles.buttonBox}>
          <ConfirmButton
            theme={isWhiteMode}
            title="Confirmar"
            onPress={handleConfirm}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
  heading: {
    textAlign: "left",
    width: "100%",
  },
  title: {
    fontFamily: fonts.heading,
    color: colors.white,
    fontSize: 27,
    lineHeight: 50,
  },
  subtitle: {
    fontFamily: fonts.heading,
    color: colors.white,
    fontSize: 20,
    lineHeight: 50,
  },
  form: {
    width: "100%",
    marginVertical: 5,
  },
  input: {
    height: 64,
    padding: 20,
    borderRadius: 8,
    color: colors.white,
    backgroundColor: colors.inputBackground,
  },
  buttonBox: {
    width: "100%",
  },
  buttonText: {
    fontFamily: fonts.subtitle,
    fontSize: 16,
  },
  orBox: {
    marginVertical: "-10%",
  },
  socialRegister: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginBottom: "5%",
  },
  redAdvertisement: {
    color: colors.pastelRed,
    fontFamily: fonts.heading,
    fontSize: 10,
    marginTop: 10,
    marginLeft: 5
  },
});