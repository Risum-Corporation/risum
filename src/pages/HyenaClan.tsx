import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";

import colors from "../styles/colors";
import { TopBar } from "../components/TopBar";
import { EmbledWP } from "../components/EmbledHC";
import StackContext from "../contexts/Stack";

export function WolfPack() {
  // Theme
  const { isWhiteMode } = useContext(StackContext);

  return (
    <View style={[isWhiteMode ? styles.wrapperLight : styles.wrapper]}>
      <TopBar name="CupForce" />
      <EmbledWP />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    height: "100%",
  },
  wrapperLight: {
    backgroundColor: colors.backgroundLight,
  },
});
