import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import colors from "../styles/colors";
import risumIcon from "../assets/tinyIcon.png";
import fonts from "../styles/fonts";
import { ConfirmButton } from "../components/ConfirmButton";

export function RegisterStg1() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.progressBar}>
          <Image source={risumIcon} style={styles.tinyLogo} />
          <Image source={risumIcon} style={styles.tinyLogo} />
          <Image source={risumIcon} style={styles.tinyLogo} />
        </View>

        <View style={styles.heading}>
          <Text style={styles.title}>E-mail{"\n"}e RisumTag</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            placeholder={"alekprincipebra@mail.com"}
            placeholderTextColor={colors.inputText}
            style={styles.input}
          />
          <TextInput
            placeholder={"Roberto_dos_memes"}
            placeholderTextColor={colors.inputText}
            style={styles.input}
          />
        </View>

        <ConfirmButton title="Confirmar" />
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
  progressBar: {
    backgroundColor: colors.white,
    width: "100%",
    height: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    textAlign: "left",
    width: "100%",
  },
  tinyLogo: {
    width: 24,
    height: 24,
  },
  title: {
    fontFamily: fonts.heading,
    color: colors.white,
    fontSize: 27,
    lineHeight: 50,
  },
  form: {
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    width: "100%",
  },
  input: {
    height: 64,
    padding: 20,
    borderBottomWidth: 1,
    color: colors.green,
  },
  buttonText: {
    fontFamily: fonts.subtitle,
    fontSize: 16,
  },
});
