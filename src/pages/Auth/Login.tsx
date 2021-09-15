import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { ConfirmButton } from "../../components/ConfirmButton";

import firebase from "../../firebaseConnection";

import googleWhite from "../../assets/googleWhite.png";
import appleWhite from "../../assets/appleWhite.png";
import facebookWhite from "../../assets/facebookWhite.png";
import { useNavigation } from "@react-navigation/core";

import AuthContext from "../../contexts/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StackContext from "../../contexts/Stack";

export function Login() {
  const { signed, user, login } = useContext(AuthContext);
  const userName = user?.userName;

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
    const avatar = await AsyncStorage.getItem("@risum:avatar");

    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        return login({ userName, email, avatar });
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
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.heading}>
          <Text style={styles.title}>Entre com sua{"\n"}Conta Risum</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={colors.placeholderText}
            style={[
              styles.input,
              { borderTopRightRadius: 8, borderTopLeftRadius: 8 },
            ]}
            onChangeText={handleEmailInputChange}
          />
          <TextInput
            placeholder="********"
            placeholderTextColor={colors.placeholderText}
            style={[
              styles.input,
              { borderBottomRightRadius: 8, borderBottomLeftRadius: 8 },
            ]}
            onChangeText={handlePasswordInputChange}
            secureTextEntry={true}
          />
          <View style={styles.textBox}>
            {isEmailOrUsernameInvalid && (
              <Text style={styles.redAdvertisement}>{errorMessage}</Text>
            )}
            <TouchableOpacity onPress={handleForgotPwd}>
              <Text style={styles.text}>Esqueci minha senha</Text>
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
          <Text style={styles.subtitle}>OU</Text>
        </View>

        <View style={styles.socialRegister}>
          <TouchableOpacity activeOpacity={0.7}>
            <Image source={googleWhite} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{ marginHorizontal: "25%" }}
          >
            <Image source={appleWhite} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <Image source={facebookWhite} />
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
    marginVertical: 5,
  },
  input: {
    height: 64,
    padding: 20,
    borderBottomWidth: 1,
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
});
