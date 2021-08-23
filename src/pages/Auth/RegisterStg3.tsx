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
import { useNavigation } from "@react-navigation/native";

import AuthContext from "../../contexts/Auth";

export function RegisterStg3() {
  const { login } = useContext(AuthContext);

  const [pwd, setPwd] = useState<string>();
  const [pwdConfirm, setPwdConfirm] = useState<string>();
  const [isPwdIncorrect, setIsPwdIncorrect] = useState(false);

  function handlePwdCreate(pwd1: string) {
    setPwd(String(pwd1));
  }

  function handlePwdChange(pwd2: string) {
    setPwdConfirm(String(pwd2));
  }

  async function handleSubmit() {
    if (pwd == pwdConfirm && !!pwd) {
      setIsPwdIncorrect(false);
      try {
        await AsyncStorage.setItem("@risum:password", pwd);
        return login();
      } catch {
        Alert.alert(
          "Não foi possível salvar a sua senha, tente novamente mais tarde."
        );
      }
    } else {
      return setIsPwdIncorrect(true);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <RegisterProgressBar position={75} />

        <View style={styles.heading}>
          <Text style={styles.title}>Digite uma{"\n"}nova senha</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            placeholder="Senha"
            placeholderTextColor={colors.placeholderText}
            style={[
              styles.input,
              { borderTopRightRadius: 8, borderTopLeftRadius: 8 },
            ]}
            onChangeText={handlePwdCreate}
            secureTextEntry={true}
          />
          <TextInput
            placeholder="Confirme a senha"
            placeholderTextColor={colors.placeholderText}
            style={[
              styles.input,
              { borderBottomRightRadius: 8, borderBottomLeftRadius: 8 },
            ]}
            secureTextEntry={true}
            onChangeText={handlePwdChange}
          />
          {isPwdIncorrect && (
            <Text style={styles.redAdvertisement}>Senhas inválidas</Text>
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
    backgroundColor: colors.inputBackground,
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
