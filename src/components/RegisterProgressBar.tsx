import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../styles/colors";

interface PositionProps {
  position: number;
}

export function RegisterProgressBar(props: PositionProps) {
  return (
    <View style={styles.progressBackground}>
      <View
        style={[styles.currentProgress, { width: `${props.position}%` }]}
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
