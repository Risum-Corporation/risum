import React, { useContext } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { ConfirmButton } from "../../components/ConfirmButton";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

import { RegisterProgressBar } from "../../components/RegisterProgressBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

import AuthContext from "../../contexts/Auth";
import StackContext from "../../contexts/Stack";

export function RegisterStg3() {
  const { login } = useContext(AuthContext);
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { isWhiteMode } = useContext(StackContext);

  function handleUserNameCreate(userName1: string) {
    setUserName(String(userName1));
  }

  async function handleSubmit() {
    try {
      await AsyncStorage.setItem("@risum:userName", String(userName));

      const emailStoraged = await AsyncStorage.getItem("@risum:email");
      setEmail(emailStoraged!);

      const avatar = "../assets/profilePicture.gif"; // Async storage dps

      return login({ userName, email, avatar });
    } catch {
      Alert.alert(
        "Não foi possível salvar a sua senha, tente novamente mais tarde."
      );
    }
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
      <View
        style={
          isWhiteMode
            ? [styles.wrapper, { backgroundColor: colors.backgroundLight }]
            : [styles.wrapper, { backgroundColor: colors.background }]
        }
      >
        <RegisterProgressBar position={75} theme={isWhiteMode}/>


        <View style={styles.heading}>
          <Text
            style={
              isWhiteMode
                ? [styles.title, { color: colors.whiteLight }]
                : [styles.title, { color: colors.white }]
            }
          >
            Insira seu{"\n"}nome de usuário
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            placeholder="Nome de usuário"
            placeholderTextColor={
              isWhiteMode ? colors.placeholderTextLight : colors.placeholderText
            }
            style={
              isWhiteMode
                ? [
                    styles.input,
                    {
                      backgroundColor: colors.inputBackgroundLight,
                      color: colors.whiteLight,
                    },
                  ]
                : [
                    styles.input,
                    {
                      backgroundColor: colors.inputBackground,
                      color: colors.white,
                    },
                  ]
            }
            onChangeText={handleUserNameCreate}
          />
          {/* Avatar do perfil */}
        </View>
        <View style={styles.buttonBox}>
          <ConfirmButton
            theme={isWhiteMode}
            title="Confirmar"
            onPress={handleSubmit}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  heading: {
    textAlign: "left",
    width: "100%",
    marginTop: "-5%",
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
    marginTop: "-10%",
  },
  input: {
    height: 64,
    padding: 20,
    borderBottomWidth: 1,
  },
  buttonBox: {
    width: "100%",
    marginTop: "-0%",
  },
  buttonText: {
    fontFamily: fonts.subtitle,
    fontSize: 16,
  },
  orBox: {
    marginTop: "-10%",
    marginBottom: "-10%",
  },
  socialRegister: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginBottom: "5%",
  },
});
