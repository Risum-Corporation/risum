import React, { useContext, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import colors from "../styles/colors";
import { ConfirmButton } from "../components/ConfirmButton";
import StackContext from "../contexts/Stack";
import { TopBar } from "../components/TopBar";

import { SendFileButton } from "../components/SendFileButton";

import fonts from "../styles/fonts";
import { TextInput } from "react-native-paper";
import AuthContext from "../contexts/Auth";

export function AddMeme() {
  const [memeTitle, setMemeTitle] = React.useState<string>();
  const [tags, setTags] = React.useState<string>();
  const { signOut, signed } = useContext(AuthContext);

  // Theme
  const { isWhiteMode } = useContext(StackContext);

  async function userVerification() {
    if (!signed) {
      signOut();
    }
  }

  useEffect(() => {
    userVerification();
  }, []);

  return (
    <ScrollView
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
        <SendFileButton theme={isWhiteMode} />

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
            selectionColor={colors.divider}
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
            selectionColor={colors.divider}
            placeholder="Shitpost, Cum, Zoio..."
            theme={{
              colors: {
                text: isWhiteMode ? colors.whiteLight : colors.white,
                primary: isWhiteMode ? colors.greenLight : colors.green,
                placeholder: isWhiteMode ? colors.whiteLight : colors.white,
              },
            }}
          />

          <View style={styles.button}>
            <ConfirmButton theme={isWhiteMode} title="Pronto!" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    marginHorizontal: 35,
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
