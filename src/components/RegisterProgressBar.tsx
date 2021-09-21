import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../styles/colors";

interface PositionProps {
  position: number;
  theme: boolean

}

export function RegisterProgressBar({position, theme} : PositionProps) {
  return (
    <View style={styles.progressBackground}>
      <View
        style={[styles.currentProgress, { width: `${position}%`, backgroundColor: theme ? colors.purpleLight : colors.green }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  progressBackground: {
    backgroundColor: colors.white,
    width: "100%",
    height: 5,
    position: 'absolute',
    top: 30,
    
  },
  currentProgress: {
    backgroundColor: colors.green,
    height: 5,

    // width no próprio inline styles
  },
});
