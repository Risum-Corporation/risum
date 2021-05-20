import React from "react";
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
} from "react-native";
import risumIconImg from "../assets/risumIcon.png";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { useNavigation } from "@react-navigation/core";

export function Welcome() {
  const navigation = useNavigation(); // go to next screen
  function handleRegister() {
    navigation.navigate("RegisterStg1");
  }
  function handleLogin() {
    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Image
          source={risumIconImg}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Risum</Text>

        <View style={styles.btnBox}>
          <TouchableOpacity
            style={[styles.button, styles.singUpBtn]}
            activeOpacity={0.7}
            onPress={handleRegister}
          >
            <Text>Criar {"\n"} Conta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.singInBtn]}
            activeOpacity={0.7}
            onPress={handleLogin}
          >
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.guestBox}>
          <TouchableOpacity
            style={styles.guestBtn}
            activeOpacity={0.7}
            onPress={handleLogin}
          >
            <Text>Entrar como Convidado</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footer}>Bem vindo ao Risum!</Text>
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
  title: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.green,
    marginTop: -80,
  },
  footer: {},
  image: {
    height: Dimensions.get("window").width * 0.9,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7.3,
    height: 90,
    width: "100%",
    flex: 1,
  },
  singUpBtn: {
    backgroundColor: colors.purple,
    marginRight: 20,
  },
  singInBtn: {
    backgroundColor: colors.green,
  },
  btnBox: {
    flex: 1,
    width: "97%",
    flexDirection: "row",
    marginTop: "20%",
  },
  guestBtn: {
    height: 10,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
  },
  guestBox: {
    width: "90%",
  },
});
