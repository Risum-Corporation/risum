import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import { ConfirmButton } from "../components/ConfirmButton";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

import risumIcon from "../assets/tinyIcon.png";
import { useState } from "react";

export function RegisterStg3() {
  const [pwd, setPwd] = useState<string>();
  const [pwdConfirm, setPwdConfirm] = useState<string>();
  const [isPwdIncorrect, setIsPwdIncorrect] = useState(false);

  function handlePwdCreate(pwd1: string) {
    setPwd(String(pwd1));
  }

  function handlePwdChange(pwd2: string) {
    setPwdConfirm(String(pwd2));
  }

  function handleSubmit() {
    if (pwd == pwdConfirm) {
      setIsPwdIncorrect(false);
      // salvar senha e navegação
    } else {
      setIsPwdIncorrect(true);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.progressBar}>
          <Image source={risumIcon} style={styles.tinyLogo} />
          <Image source={risumIcon} style={styles.tinyLogo} />
          <Image source={risumIcon} style={styles.tinyLogo} />
        </View>

        <View style={styles.heading}>
          <Text style={styles.title}>Digite uma{"\n"}nova senha</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            placeholder="Senha"
            placeholderTextColor={colors.lightText}
            style={styles.input}
            onChangeText={handlePwdCreate}
            secureTextEntry={false}
          />
          <TextInput
            placeholder="Confirme a senha"
            placeholderTextColor={colors.lightText}
            style={styles.input}
            secureTextEntry={false}
            onChangeText={handlePwdChange}
          />
          {isPwdIncorrect && (
            <Text style={styles.redAdvertisement}>As senhas não coincidem</Text>
          )}
        </View>
        <View style={styles.buttonBox}>
          <ConfirmButton title="Confirmar" onPress={handleSubmit} />
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
  progressBar: {
    backgroundColor: colors.white,
    width: "100%",
    height: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tinyLogo: {
    width: 24,
    height: 24,
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
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    width: "100%",
    marginTop: "-10%",
  },
  input: {
    height: 64,
    padding: 20,
    borderBottomWidth: 1,
    color: colors.white,
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
  redAdvertisement: {
    color: colors.pastelRed,
    fontFamily: fonts.heading,
    fontSize: 10,
    marginTop: 4,
  },
});
