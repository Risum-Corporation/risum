import React, { useContext } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  StatusBar,
  Platform,
} from "react-native";

import { Button } from "react-native-paper";

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

        <View style={styles.titleBox}>
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
          <Button
            mode="outlined"
            onPress={handleEnterAsGuest}
            color={colors.text}
            uppercase={false}
            contentStyle={{}}
            style={[
              styles.guestButton,
              isWhiteMode ? {} : { borderColor: colors.outlineGray },
            ]}
          >
            <Text style={styles.text}>Entrar como Convidado</Text>
          </Button>
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
    borderWidth: 2,
    paddingHorizontal: "6%",
  },
});
