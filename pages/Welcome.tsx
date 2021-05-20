import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import logo from "../assets/adaptive-icon.png";
import colors from "../styles/colors";

export function Welcome() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.img} />

        <Text style={styles.title}>Risum</Text>
      </View>

      <View>
          <TouchableOpacity style={styles.button}>
              <Text>
                  Sign up
              </Text>
          </TouchableOpacity>
      </View>

      <View>
          <TouchableOpacity style={styles.button2}>
              Enter as guest
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.background,
  },
  img: {
    width: 296,
    height: 328,
  },
  title: {
    color: colors.heading,
    fontSize: 46,
  },
  header: {
    flex: 1,
    alignItems: "center",
  },
  button: {
      backgroundColor: colors.green,
      width: 147,
      height: 88.79,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
  },
  button2: {
    backgroundColor: colors.purple,
    color: colors.heading,
    width: 318.71,
    height: 50.47,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
