import React, { useContext, useEffect } from "react";
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
import { SafeZoneView } from "../../styles/Theme";

export function Welcome() {
  const navigation = useNavigation(); // Navigation between screen
  const { loginAnonymously } = useContext(AuthContext);

  function handleEnterAsGuest() {
    loginAnonymously();
  }

  // Theme
  const { isWhiteMode, toggleWhiteMode } = useContext(StackContext);

  return (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <View style={styles.container}>
          <View style={styles.risumIcon}>
            <TouchableOpacity onPress={toggleWhiteMode}>
              <Image source={isWhiteMode ? risumWhiteIcon : risumIcon} />
            </TouchableOpacity>
            <Text
              style={[
                styles.title,
                { color: isWhiteMode ? colors.greenLight : colors.green },
              ]}
            >
              Risum
            </Text>
          </View>

          <View
            style={{
              marginHorizontal: "8%",
              alignItems: "center",
            }}
          >
            <TwoButton
              title={`Criar ${"\n"} Conta `}
              then={() => {
                navigation.navigate("RegisterStg1");
              }}
              title1="Login"
              then1={() => {
                navigation.navigate("Login");
              }}
              theme={isWhiteMode}
            />
            <View style={styles.guestBox}>
              <TouchableOpacity
                onPress={handleEnterAsGuest}
                style={[
                  styles.guestButton,
                  {
                    borderColor: isWhiteMode
                      ? colors.grayLight
                      : colors.outlineGray,
                  },
                ]}
              >
                <Text style={styles.text}>Entrar como Convidado</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[
              styles.footer,
              {
                backgroundColor: isWhiteMode
                  ? colors.lightBackgroundLight
                  : colors.lightBackground,
              },
            ]}
          >
            <Text style={styles.text}>Bem vindo ao Risum!</Text>
          </View>
        </View>
      }
    />
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
