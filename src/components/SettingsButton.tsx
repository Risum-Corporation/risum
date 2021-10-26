import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { useNavigation } from "@react-navigation/native";

interface ButtonProps {
  title: string;
  icon: any;
  theme: boolean;
  dark: any;
  light: any;
  goTo: string;
}

export function SettingsButton({
  title,
  icon,
  theme,
  light,
  dark,
  goTo,
}: ButtonProps) {
  const navigation = useNavigation();

  function handleGoto() {
    navigation.navigate(goTo);
  }

  return (
    <TouchableOpacity style={styles.item} onPress={handleGoto}>
      <MaterialIcons name={icon} size={33} color={theme ? light : dark} />
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
