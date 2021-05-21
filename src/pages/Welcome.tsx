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
import risumIcon from "../assets/risumIcon.png";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { useNavigation } from "@react-navigation/core";

export function Welcome() {
  const navigation = useNavigation(); // Navigation between screen

  function handleRegister() {
    navigation.navigate("RegisterStg1");
  }
  function handleLogin() {
    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.imageBox}>
          <Image source={risumIcon} style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.title}>Risum</Text>
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity
            style={[styles.button, styles.signUpButton]}
            activeOpacity={0.7}
            onPress={handleRegister}
          >
            <Text style={[styles.text, { color: colors.white }]}>
              Criar{"\n"}Conta
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.signInButton]}
            activeOpacity={0.7}
            onPress={handleLogin}
          >
            <Text style={[styles.text, { color: colors.background }]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.guestBox}>
          <TouchableOpacity style={styles.guestButton} activeOpacity={0.7}>
            <Text style={[styles.text, { color: colors.text }]}>
              Entrar como Convidado
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.text, { color: colors.text }]}>
            Bem vindo ao Risum!
          </Text>
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
  imageBox: {
    flex: 1,
    marginTop: "15%",
  },
  titleBox: {
    flex: 1,
    marginTop: "25%",
  },
  buttonBox: {
    flex: 1,
    width: "97%",
    flexDirection: "row",
    marginTop: "-16%",
  },
  guestBox: {
    flex: 1,
    width: "97%",
    marginTop: "-18%",
  },
  image: {
    height: Dimensions.get("window").width * 0.9,
  },
  title: {
    fontSize: 50,
    fontFamily: fonts.heading,
    textAlign: "center",
    color: colors.green,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    height: 90,
    width: "100%",
    flex: 1,
  },
  signUpButton: {
    backgroundColor: colors.purple,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  signInButton: {
    backgroundColor: colors.green,
  },
  guestButton: {
    height: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    borderRadius: 7,

    borderColor: colors.outlineGray,
    borderWidth: 2,
  },
  footer: {
    backgroundColor: colors.lightBackground,
    width: "120%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.heading,
  },
});