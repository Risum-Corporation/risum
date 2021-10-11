import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface ButtonProps {
  title: string;
  icon: string;
  theme: boolean;
}

export function ButtonWithIcon({ title, icon, theme }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.item}>
      <MaterialIcons
        name={icon}
        size={33}
        color={theme ? colors.whiteLight : colors.white}
      />
      <Text
        style={[
          styles.subtitle,
          theme ? { color: colors.whiteLight } : { color: colors.white },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    color: colors.white,
    fontFamily: fonts.subtitle,
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
  },
});
