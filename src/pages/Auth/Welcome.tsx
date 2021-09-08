import React, { useContext } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
} from "react-native";

import { Button } from "react-native-paper";

import risumIcon from "../../assets/risumIcon.png";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

import { useNavigation } from "@react-navigation/core";
import AuthContext from "../../contexts/Auth";

export function Welcome() {
  const navigation = useNavigation(); // Navigation between screen
  const { login } = useContext(AuthContext);

  function handleRegister() {
    return navigation.navigate("RegisterStg1");
  }

  function handleLogin() {
    return navigation.navigate("Login");
  }

  function handleEnterAsGuest() {
    const userName = "Convidado";
    const email = "convidado@email.com";
    const avatar = "../assets/profilePicture.png";

    return login({
      userName,
      email,
      avatar,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View>
          <Image source={risumIcon} style={styles.image} />
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
            <Text style={[styles.text, { color: colors.white }]}>Criar</Text>
            <Text style={[styles.text, { color: colors.white }]}>Conta</Text>
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
          <Button
            mode="outlined"
            onPress={handleEnterAsGuest}
            color={colors.text}
            uppercase={false}
            contentStyle={{}}
            style={styles.guestButton}
          >
            <Text style={styles.text}>Entrar como Convidado</Text>
          </Button>
        </View>

        <View style={styles.footer}>
          <Text style={styles.text}>Bem vindo ao Risum!</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: colors.background,
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
  titleBox: {
    marginTop: "-20%",
  },
  buttonBox: {
    width: "97%",
    flexDirection: "row",
    marginTop: 70,
  },
  guestBox: {
    flex: 1,
    marginTop: 50,
    opacity: 0.7,
  },
  image: {
    width: 153,
    height: Dimensions.get("window").width * 0.9,
    resizeMode: "contain",
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
    color: colors.text,
  },
  guestButton: {
    borderColor: colors.outlineGray,
    borderWidth: 2,
    paddingHorizontal: "6%",
  },
});
