import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../styles/colors";

import { TopBar } from "../components/TopBar";
import AuthContext from "../contexts/Auth";

export function HypeTrain() {
  const { signOut } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <TopBar name="HypeTrain" />
      <TouchableOpacity
        onPress={signOut}
        style={{ backgroundColor: colors.pastelRed }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
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
