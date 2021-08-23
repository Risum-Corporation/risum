import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../styles/colors";


export function SavedMemes() {
  
  return (
    <View style={styles.container}>
        <Text style={{color: 'white'}}>SavedMemes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.background,
    color:  colors.text
  },
});
