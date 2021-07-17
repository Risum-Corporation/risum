import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../styles/colors";

import { TopBar } from "../components/TopBar";

export function HypeTrain() {
  return (
    <View style={styles.container}>
      <TopBar name="HypeTrain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.background,
  },
});
