import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
 } from "react-native";

import colors from "../styles/colors";
import { TopBar } from "../components/TopBar";
import { EmbledWP } from "../components/EmbledHC";
import SwitchMode from "../styles/SwitchMode";

export function WolfPack() {

    // Theme
    let isSwitchOn = SwitchMode.isSwitchOn;

  return (
    <View style={[isSwitchOn ? styles.wrapperLight : styles.wrapper]}>
      <TopBar name="CupForce" />
      <EmbledWP />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    height: '100%'
  },
  wrapperLight: {
    backgroundColor: colors.backgroundLight,

  }
});
