import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import colors from "../styles/colors";

export function GoBackButton({ ...props }: TouchableOpacityProps) {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <Ionicons name="arrow-back" color="white" size={25} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightBackground,
    borderRadius: 8,
    width: 30,
    height: 30,

    position: "absolute",
    top: 20,
    left: 15,

    justifyContent: "center",
    alignItems: "center",
  },
});
