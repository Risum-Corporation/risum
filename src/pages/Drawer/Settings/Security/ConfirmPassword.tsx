import React, { useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native-paper";
import firebase from "../../../../database/firebaseConnection";

import StackContext from "../../../../contexts/Stack";
import { SafeZoneView } from "../../../../styles/Theme";
import colors from "../../../../styles/colors";
import { ConfirmButton } from "../../../../components/ConfirmButton";
import fonts from "../../../../styles/fonts";
import AuthContext from "../../../../contexts/Auth";
import { useNavigation } from "@react-navigation/native";

export function ConfirmPassword() {
  const [password, setPassword] = useState<string>();
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean>(false);

  const navigation = useNavigation();

  const { isWhiteMode } = useContext(StackContext);
  const { deleteAccount } = useContext(AuthContext);

  function handlePasswordInputChange(value: string) {
    setPassword(value);
  }

  async function handleConfirm() {
    if (password != null && password != "") {
      try {
        deleteAccount(password);
      } catch (error) {
        setIsPasswordInvalid(true);
      }
    }
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
              Confirme{"\n"}sua senha
            </Text>
          </View>

          <View style={styles.form}>
            <TextInput
              label="Senha"
              mode={"flat"}
              onChangeText={handlePasswordInputChange}
              placeholder="******"
              secureTextEntry={true}
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

            {isPasswordInvalid && (
              <>
                <Text style={styles.redAdvertisement}>Senha inválida!</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ForgotPasswordStg1")}
                >
                  <Text
                    style={[
                      styles.text,
                      { color: isWhiteMode ? colors.whiteLight : colors.white },
                    ]}
                  >
                    Esqueci minha senha
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          <View style={styles.buttonBox}>
            <ConfirmButton
              theme={isWhiteMode}
              title="Apagar conta"
              onPress={() => {
                handleConfirm();
              }}
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
  text: {
    fontSize: 14,
    fontFamily: fonts.heading,
    color: colors.white,
    padding: 9,
  },
});
