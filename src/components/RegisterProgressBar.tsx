import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../styles/colors";

export function RegisterProgressBar(position: object) {
  return (
    <View style={styles.progressBackground}>
      <View
        style={[styles.currentProgress, { width: `${position.position}%` }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  progressBackground: {
    backgroundColor: colors.white,
    width: "100%",
    marginTop: 5,
    height: 5,
  },
  currentProgress: {
    backgroundColor: colors.green,
    height: 5,

    // width no próprio inline styles
  },
});
