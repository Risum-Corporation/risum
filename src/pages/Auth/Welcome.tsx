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
import { TwoButton } from "../../components/TwoButton";

export function Welcome() {
  const navigation = useNavigation(); // Navigation between screen
  const { login } = useContext(AuthContext);

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
    <SafeAreaView style={[styles.container]}>
      <View style={styles.risumIcon}>
        <TouchableOpacity>
          <Image source={risumIcon} />
        </TouchableOpacity>
        <Text style={[styles.title]}>Risum</Text>
      </View>

      <View style={{ marginHorizontal: "8%" }}>
        <TwoButton
          title={`Criar ${"\n"} Conta `}
          goto={"RegisterStg1"}
          title1="Login"
          goto1={"Login"}
        />
        <View style={styles.guestBox}>
          <TouchableOpacity
            onPress={handleEnterAsGuest}
            style={styles.guestButton}
          >
            <Text style={styles.text}>Entrar como Convidado</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text}>Bem vindo ao Risum!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: colors.background,
  },
  risumIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    marginBottom: 50,
  },
  title: {
    color: colors.green,
    fontSize: 50,
    fontFamily: fonts.heading,
    marginTop: 20,
  },
  guestBox: {
    alignItems: "center",
    marginTop: 50,
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
  text: {
    fontSize: 20,
    fontFamily: fonts.heading,
    color: colors.text,
  },
  footer: {
    backgroundColor: colors.lightBackground,
    height: 55,
    bottom: 1,

    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
});
