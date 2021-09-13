import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";
import colors from "../styles/colors";

import fonts from "../styles/fonts";

interface ConfirmButtonProps extends TouchableOpacityProps {
  title: string;
  theme: boolean;
}

export function ConfirmButton({ title, theme, ...rest }: ConfirmButtonProps) {
  return (
    <TouchableOpacity
      style={
        theme
          ? [styles.container, { backgroundColor: colors.greenLight }]
          : [styles.container, { backgroundColor: colors.green }]
      }
      {...rest}
    >
      <Text
        style={
          theme
            ? [styles.text, { color: colors.whiteLight }]
            : [styles.text, { color: colors.background }]
        }
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    width: "100%",
    height: 60,

    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.heading,
  },
});
