import React, { useContext } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  StatusBar,
} from "react-native";

import risumIcon from "../../assets/risumIcon.png";
import risumWhiteIcon from "../../assets/risumWhiteIcon.png";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

import { useNavigation } from "@react-navigation/core";
import AuthContext from "../../contexts/Auth";
import StackContext from "../../contexts/Stack";
import { TwoButton } from "../../components/TwoButton";

export function ForgotPasswordStg2() {
  const navigation = useNavigation(); // Navigation between screen
  const { loginAnonymously } = useContext(AuthContext);

  function handleEnterAsGuest() {
    loginAnonymously();
  }

  // Theme
  const { isWhiteMode, toggleWhiteMode } = useContext(StackContext);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isWhiteMode
            ? colors.backgroundLight
            : colors.background,
        },
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
  
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  risumIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    marginBottom: 50,
  },
  title: {
    fontSize: 50,
    fontFamily: fonts.heading,
    marginTop: 20,
  },
  guestBox: {
    alignItems: "center",
    marginTop: 50,
    width: "100%",
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
    height: 55,
    bottom: 1,

    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
});
