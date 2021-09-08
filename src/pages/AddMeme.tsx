import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import colors from "../styles/colors";
import { ConfirmButton } from "../components/ConfirmButton";
import StackContext from "../contexts/Stack";
import { TopBar } from "../components/TopBar";

import { SimpleLineIcons } from "@expo/vector-icons";
import fonts from "../styles/fonts";

export function AddMeme() {
  const [memeTitle, setMemeTitle] = React.useState<string>();
  const [tags, setTags] = React.useState<string>();

  // Theme
  const { isWhiteMode } = useContext(StackContext);

  return (
    <KeyboardAvoidingView
      style={
        isWhiteMode
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
              isWhiteMode
                ? { borderColor: colors.greenLight }
                : { borderColor: colors.green },
            ]}
          >
            <SimpleLineIcons
              name="cloud-upload"
              size={120}
              color={isWhiteMode ? colors.greenLight : colors.green}
            />
            <Text
              style={[
                styles.title,
                isWhiteMode
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
          <TextInput
            placeholder="Nome do Meme"
            style={[
              styles.input,
              { borderTopRightRadius: 8, borderTopLeftRadius: 8 },
            ]}
            placeholderTextColor={colors.placeholderText}
          />
          <TextInput
            placeholder="Tags"
            style={[
              styles.input,
              { borderBottomLeftRadius: 8, borderBottomRightRadius: 8 },
            ]}
            placeholderTextColor={colors.placeholderText}
          />

          <View style={styles.button}>
            <ConfirmButton
              theme={isWhiteMode ? colors.greenLight : colors.green}
              title="Pronto!"
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    height: 64,
    padding: 20,
    borderBottomWidth: 1,
    color: colors.white,
    backgroundColor: colors.inputBackground,
  },
  button: {
    marginTop: 40,
    paddingHorizontal: 100,
  },
});
