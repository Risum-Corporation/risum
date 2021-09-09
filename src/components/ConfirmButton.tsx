import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";

import fonts from "../styles/fonts";

interface ConfirmButtonProps extends TouchableOpacityProps {
  title: string;
  theme: string;
}

export function ConfirmButton({ title, theme, ...rest }: ConfirmButtonProps) {
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: theme }]}
      {...rest}
    >
      <Text style={styles.text}>{title}</Text>
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
    color: "black",
    fontFamily: fonts.heading,
  },
});
