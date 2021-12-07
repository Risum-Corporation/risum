import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { ConfirmButton } from "../../components/ConfirmButton";
import { useState } from "react";
import StackContext from "../../contexts/Stack";
import { TextInput } from "react-native-paper";
import firebase from "../../database/firebaseConnection";
import { useNavigation } from "@react-navigation/native";
import { SafeZoneView } from "../../styles/Theme";

export function ForgotPasswordStg1() {
  const [email, setEmail] = useState<string>();
  const [isEmailOrUsernameInvalid, setIsEmailOrUsernameInvalid] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(
    "Insira um email para prosseguir"
  );
  const { isWhiteMode } = useContext(StackContext);
  const navigation = useNavigation();

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
        navigation.navigate("ForgotPasswordStg2");
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
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <View style={styles.wrapper}>
          <View style={styles.heading}>
            <Text
              style={[
                styles.title,
                { color: isWhiteMode ? colors.whiteLight : colors.white },
              ]}
            >
              Digite seu{"\n"}Email
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
      }
    />
  );
}

const styles = StyleSheet.create({
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
    marginVertical: 5,
  },
  input: {
    borderRadius: 8,
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
    marginLeft: 5,
  },
});
