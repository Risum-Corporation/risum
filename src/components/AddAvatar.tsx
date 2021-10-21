import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";

import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface ButtonProps extends TouchableOpacityProps {
  theme: boolean;
  title: string;
  size?: number;
}

export function AddAvatar({ theme, title, ...props }: ButtonProps) {
  return (
    <TouchableOpacity style={{ marginTop: 25 }} {...props}>
      <View
        style={[
          styles.addPhotoContainer,
          theme
            ? { borderColor: colors.greenLight }
            : { borderColor: colors.green },
        ]}
      >
        <MaterialIcons
          name="person-add"
          size={90}
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
          Clique aqui para{"\n"}
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addPhotoContainer: {
    alignItems: "center",
    borderWidth: 5,
    padding: 35,

    borderStyle: "dashed",
    borderRadius: 28,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 25,
    textAlign: "center",
  },
});
