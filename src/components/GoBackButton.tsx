import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import colors from "../styles/colors";

interface GoBackButtonProps extends TouchableOpacityProps {
  theme: boolean;
}

export function GoBackButton({ theme, ...rest }: GoBackButtonProps) {
  return (
    <TouchableOpacity
      style={
        theme
          ? [styles.container, { backgroundColor: colors.lightBackgroundLight }]
          : [styles.container, { backgroundColor: colors.lightBackground }]
      }
      {...rest}
    >
      <Ionicons
        name="arrow-back"
        color={theme ? colors.whiteLight : colors.white}
        size={25}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    width: 30,
    height: 30,

    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 11,
    left: 15,

    justifyContent: "center",
    alignItems: "center",
  },
});
