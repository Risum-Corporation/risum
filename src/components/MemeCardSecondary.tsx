import React from "react";
import { View, Image, StyleSheet } from "react-native";

interface PostProps {
  postData: {
    id: number;
    memeUrl: string;
  };
}

export function MemeCardSecondary({ postData }: PostProps) {
  return (
    <View style={styles.container}>
      <Image style={styles.meme} source={{ uri: postData.memeUrl }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  meme: {
    width: 122,
    margin: 1.5,
    height: 100,
    borderRadius: 1,
    resizeMode: "cover",
  },
});
