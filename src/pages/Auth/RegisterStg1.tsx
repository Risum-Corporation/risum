import React, { useContext } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { ConfirmButton } from "../../components/ConfirmButton";
import { RegisterProgressBar } from "../../components/RegisterProgressBar";

import firebase from "../../database/firebaseConnection";

import { TextInput } from "react-native-paper";

import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import StackContext from "../../contexts/Stack";
import { AntDesign } from "@expo/vector-icons";
import AuthContext from "../../contexts/Auth";

export function RegisterStg1() {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isEmailOrPasswordInvalid, setIsEmailOrPasswordInvalid] =
    useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>(
    "Email ou senha inválidos"
  );
  const { signInWithGoogleAsync } = useContext(AuthContext);

  // Theme
  const { isWhiteMode } = useContext(StackContext);

  function handleEmailInputChange(value: string) {
    setEmail(value);
  }

  function handlePasswordInputChange(value: string) {
    setPassword(value);
  }

  async function handleConfirm() {
    if (!email || !password) {
      return setIsEmailOrPasswordInvalid(true);
    }

    await AsyncStorage.setItem("@risum:email", email);

    return await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate("RegisterStg2");
      })
      .catch((error) => {
        setIsEmailOrPasswordInvalid(true);

        if (error.code === "auth/weak-password") {
          setErrorMessage("Sua senha deve ter pelo menos 6 caracteres");
        } else if (error.code === "auth/invalid-email") {
          setErrorMessage("Email inválido");
        } else if (
          error.code === "auth/email-already-exists" ||
          error.code === "auth/email-already-in-use"
        ) {
          setErrorMessage("Email já cadastrado");
        } else {
          setErrorMessage(`Ocorreu um erro: ${error.code}`);
        }
      });
  }

  async function handleRegisterWithGoogle() {
    signInWithGoogleAsync();
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
        <RegisterProgressBar position={50} theme={isWhiteMode} />

        <View style={styles.heading}>
          <Text
            style={
              isWhiteMode
                ? [styles.title, { color: colors.whiteLight }]
                : [styles.title, { color: colors.white }]
            }
          >
            Crie sua{"\n"}conta Risum
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            label="Email"
            mode="flat"
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
          {isEmailOrPasswordInvalid && (
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
          <TouchableOpacity onPress={handleRegisterWithGoogle}>
            <AntDesign
              name="google"
              size={45}
              color={isWhiteMode ? colors.whiteLight : colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign
              name="apple1"
              size={45}
              color={isWhiteMode ? colors.whiteLight : colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity>
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
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 27,
    lineHeight: 50,
    marginTop: 40,
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
    fontSize: 12,
    marginTop: 4,
    paddingLeft: 2,
  },
});
