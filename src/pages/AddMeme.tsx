import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../styles/colors";

import { FeedBar } from "../components/FeedBar";
import { MemeCard } from "../components/MemeCard";

import { ToolBar } from "../components/ToolBar";

export function AddMeme() {
  return (
    <View style={styles.container}>
      <FeedBar />

      <MemeCard />
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
