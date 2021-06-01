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

export function RegisterStg2() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.progressBar}>
          <Image source={risumIcon} style={styles.tinyLogo} />
          <Image source={risumIcon} style={styles.tinyLogo} />
          <Image source={risumIcon} style={styles.tinyLogo} />
        </View>

        <View style={styles.heading}>
          <Text style={styles.title}>Verifique{"\n"}o seu Email</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            placeholder={"##-##-##-##"}
            placeholderTextColor={colors.lightText}
            style={styles.input}
          />
          <Text style={styles.redAdvertisement}>
            Favor não usar Email temporário :)
          </Text>
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity
            style={[styles.button, styles.reSendButton]}
            activeOpacity={0.7}
          >
            <Text style={[styles.text, { color: colors.white }]}>
              Reenviar{"\n"}Email
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.verifyButton]}
            activeOpacity={0.7}
          >
            <Text style={[styles.text, { color: colors.background }]}>
              Verificar
            </Text>
          </TouchableOpacity>
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
  progressBar: {
    backgroundColor: colors.white,
    width: "100%",
    height: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tinyLogo: {
    width: 24,
    height: 24,
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
    borderRadius: 8,

    height: 64,
    padding: 20,
    borderBottomWidth: 1,
    color: colors.green,
  },
  redAdvertisement: {
    color: colors.pastelRed,
    fontFamily: fonts.heading,
    fontSize: 10,
    marginTop: 4,
  },
  buttonBox: {
    width: "97%",
    flexDirection: "row",
    marginTop: "-10%",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    height: 90,
    width: "100%",
    flex: 1,
  },
  reSendButton: {
    backgroundColor: colors.purple,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  verifyButton: {
    backgroundColor: colors.green,
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.heading,
  },
});
