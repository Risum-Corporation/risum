import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";

import { launchImageLibrary } from "react-native-image-picker";

import { SimpleLineIcons } from "@expo/vector-icons";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface ButtonProps extends TouchableOpacityProps {
  theme: boolean;
}

export function SendFileButton({ theme, ...props }: ButtonProps) {
  function imagePickerCallback(data: any) {
    console.log(data);
  }

  return (
    <TouchableOpacity
      style={{ marginTop: 25 }}
      onPress={() => {
        launchImageLibrary(
          { mediaType: "mixed", maxHeight: 350, maxWidth: 350 },
          imagePickerCallback
        ); // Dando erro, verificar mais tarde
      }}
      {...props}
    >
      <View
        style={[
          styles.addMemeContainer,
          theme
            ? { borderColor: colors.greenLight }
            : { borderColor: colors.green },
        ]}
      >
        <SimpleLineIcons
          name="cloud-upload"
          size={120}
          color={theme ? colors.greenLight : colors.green}
        />
        <Text
          style={[
            styles.title,
            theme
              ? { color: colors.placeholderTextLight }
              : { color: colors.white },
            { marginTop: 20 },
          ]}
        >
          Clique aqui para{"\n"}postar um meme
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
});
