import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { TextInput} from "react-native-paper";
import colors from "../styles/colors";
import { ConfirmButton } from "../components/ConfirmButton";

import { TopBar } from "../components/TopBar";

import { SimpleLineIcons } from "@expo/vector-icons";
import fonts from "../styles/fonts";

export function AddMeme() {
  const [memeTitle, setMemeTitle] = React.useState("");
  const [tags, setTags] = React.useState("");



  return (
    <View style={styles.wrapper}>
      <TopBar name="Postar Meme" />

      <View style={styles.container}>
        <TouchableOpacity style={{ marginTop: 25 }}>
          <View style={styles.addMemeContainer}>
            <SimpleLineIcons
              name="cloud-upload"
              size={120}
              color={colors.green}
            />
            <Text style={[styles.title, { marginTop: 20 }]}>
              Clique aqui para{"\n"}postar um meme
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.form}>
          <TextInput
            label="Nome do Meme"
            placeholder="Homem Telegram - O Retorno?"
            value={memeTitle}
            style={styles.input}
            selectionColor={colors.green}


            onChangeText={(memeTitle) => setMemeTitle(memeTitle)}
          />
          <TextInput
            label="Tags"
            placeholder="Adicione as tags separando-as por vírgula"
            value={tags}
            style={styles.input}
            onChangeText={(tags) => setTags(tags)}
          />
          <View style={styles.button}><ConfirmButton title="Pronto!" /></View> 
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
  },
  container: {
    alignItems: "center",
    height: "100%",
    marginHorizontal: 35,
  },
  addMemeContainer: {
    alignItems: "center",
    borderColor: colors.green,
    borderWidth: 5,
    borderBottomEndRadius: 1,
    padding: 35,

    borderStyle: "dashed",
    borderRadius: 28,
  },
  title: {
    color: colors.white,
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
    marginTop: 25
  },
  input: {
    marginTop: 25,
    tintColor: colors.background
  },
  button: {
    marginTop: 40,
    paddingHorizontal: 100
  }
});
