import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import colors from "../styles/colors";
import { ConfirmButton } from "../components/ConfirmButton";
import StackContext from "../contexts/Stack";
import { TopBar } from "../components/TopBar";

import { SimpleLineIcons } from "@expo/vector-icons";
import fonts from "../styles/fonts";
import { TextInput } from "react-native-paper";

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
      <TopBar
        name="Postar Meme"
        textColor={isWhiteMode ? colors.greenLight : colors.green}
        iconColor={isWhiteMode ? colors.whiteLight : colors.white}
        searchColor={isWhiteMode ? colors.whiteLight : colors.white}
        searchBackgroundColor={
          isWhiteMode ? colors.lightBackgroundLight : colors.lightBackground
        }
      />

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

        <View style={[styles.form]}>
          <TextInput
            label="Título do Meme"
            mode={"flat"}
            value={memeTitle}
            onChangeText={(tags) => setMemeTitle(memeTitle)}
            placeholder="Telegram 2 - O Retorno?"
            placeholderTextColor={
              isWhiteMode ? colors.placeholderTextLight : colors.placeholderText
            }
            underlineColor={"transparent"}
            style={
              isWhiteMode
                ? { backgroundColor: colors.lightBackgroundLight }
                : {
                    backgroundColor: colors.lightBackground,
                    color: colors.white,
                    textDecorationColor: colors.white,
                  }
            }
            selectionColor={isWhiteMode ? colors.dividerLight : colors.divider}
            theme={{
              colors: {
                text: isWhiteMode ? colors.whiteLight : colors.white,
                primary: isWhiteMode ? colors.greenLight : colors.green,
                placeholder: isWhiteMode ? colors.whiteLight : colors.white,
              },
            }}
          />

          <TextInput
            label="Tags"
            mode={"flat"}
            value={tags}
            onChangeText={(tags) => setTags(tags)}
            placeholderTextColor={
              isWhiteMode ? colors.placeholderTextLight : colors.placeholderText
            }
            underlineColor={"transparent"}
            style={
              isWhiteMode
                ? { backgroundColor: colors.lightBackgroundLight }
                : {
                    backgroundColor: colors.lightBackground,
                    color: colors.white,
                    textDecorationColor: colors.white,
                  }
            }
            selectionColor={isWhiteMode ? colors.dividerLight : colors.divider}
            placeholder="Separe-as por vígula"
            theme={{
              colors: {
                text: isWhiteMode ? colors.whiteLight : colors.white,
                primary: isWhiteMode ? colors.greenLight : colors.green,
                placeholder: isWhiteMode ? colors.whiteLight : colors.white,
              },
            }}
          />

          <View style={styles.button}>
            <ConfirmButton
              theme={isWhiteMode ? colors.greenLight : colors.green}
              color={isWhiteMode ? colors.white : colors.whiteLight}
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
  },
  button: {
    marginTop: 40,
    paddingHorizontal: 100,
  },
});
