import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, MaterialCommunityIcons, Feather } from "@expo/vector-icons";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function MemeCard() {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{ uri: "https://source.unsplash.com/random/400x300" }}
          style={styles.img}
        />

        <View style={styles.memeInfo}>
          <View style={styles.buttonBox}>
            <TouchableOpacity style={styles.button}>
              <AntDesign name="like2" size={20} color={colors.white} />
            </TouchableOpacity>
            <Text style={styles.text}>43</Text>

            <TouchableOpacity style={styles.button}>
              <MaterialCommunityIcons
                name="comment-multiple-outline"
                size={20}
                color="white"
              />
            </TouchableOpacity>
            <Text style={styles.text}>17</Text>

            <TouchableOpacity style={styles.button}>
              <AntDesign name="sharealt" size={20} color={colors.white} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Feather name="bookmark" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.userBox}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.userText}>Educg550</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Image
                source={{ uri: "https://source.unsplash.com/random/40x40" }}
                style={styles.userImg}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View // Divider between memes
        style={{
          borderBottomColor: colors.dividerColor,
          borderBottomWidth: 1,
          marginTop: 16,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 25,
    marginBottom: 16,
    borderRadius: 4,
  },
  img: {
    width: 325,
    height: 260,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    resizeMode: "cover", // object-fit
  },
  memeInfo: {
    backgroundColor: colors.lightBackground,
    height: 40,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  button: {
    marginHorizontal: 5,
  },
  buttonBox: {
    flexDirection: "row", // Use 'column' for Hype Train
  },
  userBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontFamily: fonts.text,
    color: colors.white,
  },
  userText: {
    fontFamily: fonts.userText,
    color: colors.white,
  },
  userImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
