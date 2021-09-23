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
import AuthContext from "../contexts/Auth";
import StackContext from "../contexts/Stack";

import fonts from "../styles/fonts";

interface ConfirmButtonProps extends TouchableOpacityProps {
  title: string;
  title1?: string;
  goto: string;
  goto1: string;
  theme?: boolean;
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
      <View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.purple }]}
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate(`${goto}`);
          }}
        >
          <Text style={[styles.text, { color: colors.white }]}> {title}</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.green }]}
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate(`${goto1}`);
          }}
        >
          <Text style={[styles.text, { color: colors.background }]}>
            {title1}
          </Text>
        </TouchableOpacity>
      </View>
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
  },
});
