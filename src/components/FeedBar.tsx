import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function FeedBar() {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity>
          <Image
            source={{ uri: "https://source.unsplash.com/random" }}
            style={styles.img}
          />
        </TouchableOpacity>

        <Text style={styles.title}>Feed</Text>

        <TouchableOpacity>
          <AntDesign name={"search1"} size={36} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 25,
    position: 'absolute',
    top: 1,
    backgroundColor: colors.background,
  },
  wrapper: {
    marginHorizontal: 25,
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    marginVertical: 10,
    flexDirection: "row",
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.green,
  },
  img: {
    width: 36,
    height: 36,
    borderRadius: 5,
  },
});
