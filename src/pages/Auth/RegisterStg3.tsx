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

import AuthContext from "../../contexts/Auth";

export function RegisterStg3() {
  const { login } = useContext(AuthContext);
  const [userName, setUserName] = useState<string>();

  function handleUserNameCreate(userName1: string) {
    setUserName(String(userName1));
  }

  async function handleSubmit() {
    try {
      await AsyncStorage.setItem("@risum:userName", String(userName));

      const email = await AsyncStorage.getItem("@risum:email");
      const avatar = "../assets/profilePicture.gif"; // Async storage dps

      return login({ userName, email, avatar });
    } catch {
      Alert.alert(
        "Não foi possível salvar a sua senha, tente novamente mais tarde."
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <RegisterProgressBar position={75} />

        <View style={styles.heading}>
          <Text style={styles.title}>Insira seu{"\n"}nome de usuário</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            placeholder="Nome de usuário"
            placeholderTextColor={colors.placeholderText}
            style={[
              styles.input,
              { borderTopRightRadius: 8, borderTopLeftRadius: 8 },
            ]}
            onChangeText={handleUserNameCreate}
          />
          {/* Avatar do perfil */}
        </View>
        <View style={styles.buttonBox}>
          <ConfirmButton
            theme={colors.green}
            title="Confirmar"
            onPress={handleSubmit}
          />
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
});
