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
  iconColor: string;
  theme: string;
}

export function GoBackButton({iconColor, theme, ...rest }: GoBackButtonProps) {
  return (
    <TouchableOpacity style={[styles.container, {backgroundColor: theme}]} {...rest}>
      <Ionicons name="arrow-back" color={iconColor} size={25} />
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
