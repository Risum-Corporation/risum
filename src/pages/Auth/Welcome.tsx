import React, { useContext } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  StatusBar,
  Platform,
} from "react-native";

import risumIcon from "../../assets/risumIcon.png";
import risumWhiteIcon from "../../assets/risumWhiteIcon.png";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

import { useNavigation } from "@react-navigation/core";
import AuthContext from "../../contexts/Auth";
import StackContext from "../../contexts/Stack";

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
    const userName = null;
    const email = null;
    const avatar = "../assets/profilePicture.png";

    return login({
      userName,
      email,
      avatar,
    });
  }

  // Theme
  const { isWhiteMode, toggleWhiteMode } = useContext(StackContext);

  return (
    <SafeAreaView
      style={[
        styles.container,
        isWhiteMode
          ? { backgroundColor: colors.white }
          : { backgroundColor: colors.background },
      ]}
    >
      <StatusBar
        barStyle={
          Platform.OS === "ios"
            ? isWhiteMode
              ? "dark-content"
              : "light-content"
            : "default"
        }
      />
      <View
        style={[
          styles.wrapper,
          isWhiteMode
            ? { backgroundColor: colors.white }
            : { backgroundColor: colors.background },
        ]}
      >
        <TouchableOpacity onPress={() => toggleWhiteMode()}>
          <View>
            {isWhiteMode ? (
              <Image source={risumWhiteIcon} style={styles.image} />
            ) : (
              <Image source={risumIcon} style={styles.image} />
            )}
          </View>
        </TouchableOpacity>

        <View>
          <Text
            style={[
              styles.title,
              isWhiteMode
                ? { color: colors.greenLight }
                : { color: colors.green },
            ]}
          >
            Risum
          </Text>
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.signUpButton,
              isWhiteMode
                ? { backgroundColor: colors.purpleLight }
                : { backgroundColor: colors.purple },
            ]}
            activeOpacity={0.7}
            onPress={handleRegister}
          >
            <Text style={[styles.text, { color: colors.white }]}>Criar</Text>
            <Text style={[styles.text, { color: colors.white }]}>Conta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.signInButton,
              isWhiteMode
                ? { backgroundColor: colors.greenLight }
                : { backgroundColor: colors.green },
            ]}
            activeOpacity={0.7}
            onPress={handleLogin}
          >
            <Text
              style={[
                styles.text,
                isWhiteMode
                  ? { color: colors.white }
                  : { color: colors.background },
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.guestBox}>
          <TouchableOpacity
            onPress={handleEnterAsGuest}
            style={styles.guestButton}
          >
            <Text style={styles.text}>Entrar como Convidado</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[
          styles.footer,
          isWhiteMode
            ? { backgroundColor: colors.lightBackgroundLight }
            : { backgroundColor: colors.lightBackground },
        ]}
      >
        <Text style={styles.text}>Bem vindo ao Risum!</Text>
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
    justifyContent: "center",
    marginHorizontal: 20,
    backgroundColor: colors.background,
  },
  buttonBox: {
    flexDirection: "row",
    marginTop: 70,
    marginBottom: 20,
  },
  guestBox: {
    flexDirection: "row",
    marginHorizontal: 10,
  },
  image: {
    width: 160,
    height: 160,
    resizeMode: "contain",
  },
  title: {
    fontSize: 50,
    fontFamily: fonts.heading,
    marginTop: 50,
    marginBottom: 25,
    textAlign: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    height: 90,
    flex: 1,
    marginHorizontal: 10,
  },
  signUpButton: {
    backgroundColor: colors.purple,
  },
  signInButton: {
    backgroundColor: colors.green,
  },
  footer: {
    backgroundColor: colors.lightBackground,
    height: 50,
    bottom: 1,

    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.heading,
    color: colors.text,
  },
  guestButton: {
    borderWidth: 2,
    height: 50,
    borderRadius: 5,

    justifyContent: "center",
    alignItems: "center",
    width: "100%",

    opacity: 0.7,
    borderColor: colors.outlineGray,
  },
});
