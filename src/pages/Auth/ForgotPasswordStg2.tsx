import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { useNavigation } from "@react-navigation/core";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useState } from "react";

export function ForgotPasswordStg2() {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>();
  const [randomCode, setRandomCode] = useState<number>();
  const [codeInput, setCodeInput] = useState<number>();
  const [isFilled, setIsFilled] = useState(false);
  const [isCodeIncorrect, setIsCodeIncorrect] = useState(false);

  useEffect(() => {
    async function loadStoragedData() {
      const emailSaved = await AsyncStorage.getItem("@risum:email");
      setEmail(String(emailSaved));
    }

    function generateRandomCode() {
      const randomNumber = Math.floor(100000 + Math.random() * 900000); // 6-digit code
      setRandomCode(randomNumber);

      Alert.alert(`Pssiu, o seu código é: ${randomNumber}`);
    }

    loadStoragedData();
    generateRandomCode();
  }, []);

  function handleResendEmail() {
    return Alert.alert(`Email reenviado com sucesso para: ${email}`);
  }

  function handleConfirm() {
    if (codeInput === randomCode && isFilled) {
      return navigation.navigate("ForgotPasswordStg3");
    } else {
      setIsCodeIncorrect(true);
    }
  }

  function handleInputChange(value: string) {
    setCodeInput(Number(value));
    setIsFilled(!!codeInput);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.heading}>
          <Text style={styles.title}>Verifique{"\n"}o seu Email</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            placeholder={"###-###"}
            placeholderTextColor={colors.placeholderText}
            style={styles.input}
            onChangeText={handleInputChange}
            keyboardType={"number-pad"}
          />
          {isCodeIncorrect && (
            <Text style={styles.redAdvertisement}>Código inválido!</Text>
          )}
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity
            style={[styles.button, styles.resendButton]}
            activeOpacity={0.7}
            onPress={handleResendEmail}
          >
            <Text style={[styles.text, { color: colors.white }]}>
              Reenviar{"\n"}Email
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.verifyButton]}
            activeOpacity={0.7}
            onPress={handleConfirm}
          >
            <Text style={[styles.text, { color: colors.background }]}>
              Verificar
            </Text>
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
    backgroundColor: colors.inputBackground,
    borderRadius: 8,

    height: 64,
    padding: 20,
    borderBottomWidth: 1,
    color: colors.white,
  },
  redAdvertisement: {
    color: colors.pastelRed,
    fontFamily: fonts.heading,
    fontSize: 10,
    marginTop: 4,
  },
  buttonBox: {
    width: "97%",
    flexDirection: "row",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    height: 90,
    width: "100%",
    flex: 1,
  },
  resendButton: {
    backgroundColor: colors.purple,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  verifyButton: {
    backgroundColor: colors.green,
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.heading,
  },
});
