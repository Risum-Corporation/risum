import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import colors from "../styles/colors";
import { ConfirmButton } from "../components/ConfirmButton";
import { Input } from "react-native-elements";
import SwitchMode from "../styles/SwitchMode";
import { TopBar } from "../components/TopBar";

import { SimpleLineIcons } from "@expo/vector-icons";
import fonts from "../styles/fonts";

export function AddMeme() {
  const [memeTitle, setMemeTitle] = React.useState("");
  const [tags, setTags] = React.useState("");

  // Theme
  let isSwitchOn = SwitchMode.isSwitchOn;

  return (
    <View
      style={
        isSwitchOn
          ? { backgroundColor: colors.backgroundLight }
          : { backgroundColor: colors.background }
      }
    >
      <TopBar name="Postar Meme" />

      <View style={styles.container}>
        <TouchableOpacity style={{ marginTop: 25 }}>
          <View
            style={[
              styles.addMemeContainer,
              isSwitchOn
                ? { borderColor: colors.greenLight }
                : { borderColor: colors.green },
            ]}
          >
            <SimpleLineIcons
              name="cloud-upload"
              size={120}
              color={isSwitchOn ? colors.greenLight : colors.green}
            />
            <Text
              style={[
                styles.title,
                isSwitchOn
                  ? { color: colors.placeholderTextLight }
                  : { color: colors.white },
                { marginTop: 20 },
              ]}
            >
              Clique aqui para{"\n"}postar um meme
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.form}>
          <Input
            placeholder="Telegram 2 - O Retorno?"
            label="Nome do Meme"
            style={styles.input}
          />
          <Input
            placeholder="Separe as tags por vírgula"
            label="Tags"
            style={styles.input}
          />

          <View style={styles.button}>
            <ConfirmButton title="Pronto!" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    marginHorizontal: 35,
  },
  addMemeContainer: {
    alignItems: "center",
    borderWidth: 5,
    borderBottomEndRadius: 1,
    padding: 35,

    borderStyle: "dashed",
    borderRadius: 28,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 28,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: fonts.heading,
    color: colors.white,
    fontSize: 20,
    lineHeight: 50,
  },
  form: {
    width: "100%",
    marginTop: 40,
  },
  input: {
    marginTop: 25,
    color: colors.white,
  },
  button: {
    marginTop: 40,
    paddingHorizontal: 100,
  },
});
