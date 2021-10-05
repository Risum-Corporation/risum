import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  View,
} from "react-native";
import colors from "../styles/colors";
import { useNavigation } from "@react-navigation/core";

import fonts from "../styles/fonts";

interface ConfirmButtonProps extends TouchableOpacityProps {
  title: string;
  title1?: string;
  goto: string;
  goto1: string;
  theme: boolean;
}

export function TwoButton({
  title,
  title1,
  goto,
  goto1,
  theme,
  ...rest
}: ConfirmButtonProps) {
  const navigation = useNavigation(); // Navigation between screen
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: theme ? colors.purpleLight : colors.purple,
          },
        ]}
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate(`${goto}`);
        }}
        {...rest}
      >
        <Text
          style={[
            styles.text,
            { color: theme ? colors.backgroundLight: colors.white },
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: theme ? colors.greenLight : colors.green,
          },
        ]}
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate(`${goto1}`);
        }}
        {...rest}
      >
        <Text
          style={[
            styles.text,
            { color: theme ? colors.backgroundLight : colors.background },
          ]}
        >
          {title1}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.heading,
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    justifyContent: "center",
    borderRadius: 8,
    height: 90,
    width: 165,
    marginHorizontal: 4,
  },
});
