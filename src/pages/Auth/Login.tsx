import React, { useContext, useState } from "react";
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

import firebase from "../../database/firebaseConnection";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";

import AuthContext from "../../contexts/Auth";
import StackContext from "../../contexts/Stack";

import { AntDesign } from "@expo/vector-icons";
import { SafeZoneView } from "../../styles/Theme";

export function Login() {
  const { login } = useContext(AuthContext);
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>();
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

    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (cred) => {
        // Inicia a persistência do usuário
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

        await firebase
          .firestore()
          .collection("users")
          .doc(cred.user?.uid)
          .get()
          .then((doc: any) => {
            if (doc.exists) {
              const userName = doc.data().userName;
              const tag = doc.data().tag;

              // Verifica se o nome de usuário ou sua tag são inválidos, levando o usuário a cadastrá-los no RegisterStg2
              if (!userName || !tag) {
                return navigation.navigate("RegisterStg2");
              } else {
                setIsEmailOrUsernameInvalid(false);

                // Navega para Stack Routes
                return login(cred.user);
              }
            } else {
              // O usuário não existe no Firestore
              return navigation.navigate("RegisterStg2");
            }
          });
      })
      .catch((error) => {
        setIsEmailOrUsernameInvalid(true);

        if (error.code === "auth/wrong-password") {
          setErrorMessage("Senha inválida");
        } else if (error.code === "auth/invalid-email") {
          setErrorMessage("Email inválido");
        } else if (error.code === "auth/user-disabled") {
          setErrorMessage("Esta conta está desativada");
        } else if (error.code === "auth/user-not-found") {
          setErrorMessage("Usuário não encontrado");
        } else {
          setErrorMessage(`Ocorreu um erro: ${error.code}`);
        }
      });
  }

  function handleForgotPwd() {
    navigation.navigate("ForgotPasswordStg1");
  }

  return (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <View style={styles.container}>
          <View style={styles.wrapper}>
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
                  isWhiteMode
                    ? colors.placeholderTextLight
                    : colors.placeholderText
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
                  isWhiteMode
                    ? colors.placeholderTextLight
                    : colors.placeholderText
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

            {/* Implementar em futuras atualizações
            
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
            </View> */}
          </View>
        </View>
      }
    />
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
