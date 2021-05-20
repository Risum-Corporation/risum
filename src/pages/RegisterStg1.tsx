import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

export function RegisterStg1() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Register - Stage 1</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
