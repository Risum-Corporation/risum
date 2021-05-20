import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

export function Login() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Login</Text>
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
