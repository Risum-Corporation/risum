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

import googleWhite from "../assets/googleWhite.png";
import appleWhite from "../assets/appleWhite.png";
import facebookWhite from "../assets/facebookWhite.png";

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
            placeholderTextColor={colors.placeholderText}
            style={styles.input}
          />
          <TextInput
            placeholder={"RobertoMemeiro"}
            placeholderTextColor={colors.placeholderText}
            
            style={styles.input}
          />
        </View>
        <View style={styles.buttonBox}>
          <ConfirmButton title="Confirmar" />
        </View>
        <View style={styles.orBox}>
        <Text style={styles.subtitle}>OU</Text>
        </View>

        <View style={styles.socialRegister}>
          <TouchableOpacity activeOpacity={0.7}>
            <Image source={googleWhite} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{ marginLeft: "25%", marginRight: "25%" }}
          >
            <Image source={appleWhite} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <Image source={facebookWhite} />
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
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    width: "100%",
    marginTop: "-10%",
  },
  input: {
    height: 64,
    padding: 20,
    borderBottomWidth: 1,
    color: colors.green,
  },
  buttonBox: {
    width: "100%",
    marginTop: "-0%"
  },
  buttonText: {
    fontFamily: fonts.subtitle,
    fontSize: 16,
  },
  orBox: {
    marginTop: "-10%",
    marginBottom: "-10%"

  },
  socialRegister: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginBottom: "5%"
  },
});
