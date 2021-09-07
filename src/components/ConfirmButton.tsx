import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import SwitchMode from "../styles/SwitchMode";

interface ConfirmButtonProps extends TouchableOpacityProps {
  title: string;
}

export function ConfirmButton({ title, ...rest }: ConfirmButtonProps) {
  // Theme
  let isSwitchOn = SwitchMode.isSwitchOn;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSwitchOn
          ? { backgroundColor: colors.greenLight }
          : { backgroundColor: colors.green },
      ]}
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
