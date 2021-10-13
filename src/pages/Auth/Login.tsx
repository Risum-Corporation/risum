import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { ConfirmButton } from "../../components/ConfirmButton";

import firebase from "../../database/firebaseConnection";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";

import AuthContext from "../../contexts/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StackContext from "../../contexts/Stack";

import { AntDesign } from "@expo/vector-icons";

export function Login() {
  const { login } = useContext(AuthContext);
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>();
  const [userName, setUserName] = useState<string>();
  const [tag, setTag] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isEmailOrUsernameInvalid, setIsEmailOrUsernameInvalid] =
    useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>(
    "Email ou senha inválidos"
  );
  const { isWhiteMode } = useContext(StackContext);

  function handleEmailInputChange(value: string) {
    setEmail(value);
  }

  function handlePasswordInputChange(value: string) {
    setPassword(value);
  }

  async function handleConfirm() {
    if (!email || !password) {
      return setIsEmailOrUsernameInvalid(true);
    }

    // const avatar = await AsyncStorage.getItem("@risum:avatar");

    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        return login();
      })
      .catch((error) => {
        setIsEmailOrUsernameInvalid(true);

        if (error.code === "auth/wrong-password") {
          setErrorMessage("Senha inválida");
        } else if (error.code === "auth/invalid-email") {
          setErrorMessage("Email inválido");
        } else {
          setErrorMessage(`Ocorreu um erro: ${error.code}`);
        }
      });
  }

  function handleForgotPwd() {
    navigation.navigate("ForgotPasswordStg1");
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
        <View style={styles.heading}>
          <Text
            style={
              isWhiteMode
                ? [styles.title, { color: colors.whiteLight }]
                : [styles.title, { color: colors.white }]
            }
          >
            Entre com sua{"\n"}Conta Risum
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            label="Email"
            mode={"flat"}
            onChangeText={handleEmailInputChange}
            placeholder="usuario@mail.com"
            placeholderTextColor={
              isWhiteMode ? colors.placeholderTextLight : colors.placeholderText
            }
            underlineColor={"transparent"}
            style={[
              isWhiteMode
                ? { backgroundColor: colors.lightBackgroundLight }
                : {
                    backgroundColor: colors.lightBackground,
                    color: colors.white,
                    textDecorationColor: colors.white,
                  },
              styles.input,
            ]}
            selectionColor={colors.divider}
            theme={{
              colors: {
                text: isWhiteMode ? colors.whiteLight : colors.white,
                primary: isWhiteMode ? colors.greenLight : colors.green,
                placeholder: isWhiteMode ? colors.whiteLight : colors.white,
              },
            }}
          />

          <TextInput
            label="Senha"
            secureTextEntry={true}
            mode={"flat"}
            onChangeText={handlePasswordInputChange}
            placeholderTextColor={
              isWhiteMode ? colors.placeholderTextLight : colors.placeholderText
            }
            underlineColor={"transparent"}
            style={[
              isWhiteMode
                ? { backgroundColor: colors.lightBackgroundLight }
                : {
                    backgroundColor: colors.lightBackground,
                    color: colors.white,
                    textDecorationColor: colors.white,
                  },
              styles.input,
            ]}
            selectionColor={colors.divider}
            placeholder="******"
            theme={{
              colors: {
                text: isWhiteMode ? colors.whiteLight : colors.white,
                primary: isWhiteMode ? colors.greenLight : colors.green,
                placeholder: isWhiteMode ? colors.whiteLight : colors.white,
              },
            }}
          />
          <View style={styles.complementaryBox}>
            <Text style={styles.redAdvertisement}>
              {isEmailOrUsernameInvalid && errorMessage}
            </Text>

            {/* PELO AMOR DE DEUS  NÃO TIRA MAIS ESSE BOTÃO OK */}
            <TouchableOpacity onPress={handleForgotPwd}>
              <Text
                style={[
                  styles.text,
                  { color: isWhiteMode ? colors.whiteLight : colors.white },
                ]}
              >
                Esqueci minha senha
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonBox}>
          <ConfirmButton
            theme={isWhiteMode}
            title="Confirmar"
            onPress={handleConfirm}
          />
        </View>
        <View style={styles.orBox}>
          <Text
            style={[
              styles.subtitle,
              isWhiteMode
                ? { color: colors.whiteLight }
                : { color: colors.white },
            ]}
          >
            OU
          </Text>
        </View>

        <View style={styles.socialRegister}>
          <TouchableOpacity activeOpacity={0.7}>
            <AntDesign
              name="google"
              size={45}
              color={isWhiteMode ? colors.whiteLight : colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <AntDesign
              name="apple1"
              size={45}
              color={isWhiteMode ? colors.whiteLight : colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <AntDesign
              name="facebook-square"
              size={45}
              color={isWhiteMode ? colors.whiteLight : colors.white}
            />
          </TouchableOpacity>
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
  },
  input: {
    borderBottomWidth: 1,
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
    justifyContent: "space-between",
    width: "80%",
    marginBottom: "5%",
  },
  redAdvertisement: {
    color: colors.pastelRed,
    fontFamily: fonts.heading,
    fontSize: 10,
    marginTop: 10,
    paddingLeft: 2,
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.heading,
    color: colors.white,
    padding: 9,
  },
  textBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  complementaryBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
