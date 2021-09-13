import React, { useContext } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { ConfirmButton } from "../../components/ConfirmButton";
import { RegisterProgressBar } from "../../components/RegisterProgressBar";

import { TextInput } from "react-native-paper";

import googleWhite from "../../assets/googleWhite.png";
import appleWhite from "../../assets/appleWhite.png";
import facebookWhite from "../../assets/facebookWhite.png";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import StackContext from "../../contexts/Stack";

export function RegisterStg1() {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isEmailOrPasswordInvalid, setIsEmailOrPasswordInvalid] =
    useState<boolean>();
  const [errorMessage, setErrorMessage] = useState("Email ou senha inválidos");

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

    try {
      await AsyncStorage.setItem("@risum:email", email);
      await AsyncStorage.setItem("@risum:password", password);

      navigation.navigate("RegisterStg2");
    } catch {
      Alert.alert(
        "Não foi possível salvar o seu e-mail e/ou usuário, tente novamente mais tarde."
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={
          isWhiteMode
            ? [styles.wrapper, { backgroundColor: colors.backgroundLight }]
            : [styles.wrapper, { backgroundColor: colors.background }]
        }
      >
        <RegisterProgressBar position={25} />

        <View style={styles.heading}>
          <Text
            style={
              isWhiteMode
                ? [styles.title, { color: colors.whiteLight }]
                : [styles.title, { color: colors.white }]
            }
          >
            Email e{"\n"}Senha
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
            selectionColor={isWhiteMode ? colors.dividerLight : colors.divider}
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
            selectionColor={isWhiteMode ? colors.dividerLight : colors.divider}
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
            style={
              isWhiteMode
                ? [styles.subtitle, { color: colors.whiteLight }]
                : [styles.subtitle, { color: colors.white }]
            }
          >
            OU
          </Text>
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
    justifyContent: "center",
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
