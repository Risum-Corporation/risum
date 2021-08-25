import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import colors from "../styles/colors";

import { TopBar } from "../components/TopBar";
import { MemeCard } from "../components/MemeCard";

export function Feed() {
  const posts = [
    {
      id: 1,
      author: "Sapeka",
      memeUrl: "https://source.unsplash.com/random/",
      likes: 43,
      memeTitle: "Tio patinhas 👃",
      tags: ["shipost", "comedia"],
      profilePhoto: "https://source.unsplash.com/random/50x50",
      comments: 17,
    },
    {
      id: 2,
      author: "Educg550",
      memeUrl: "https://source.unsplash.com/random/",
      likes: 1223,
      memeTitle: "Tio patinhas 👃",
      tags: ["shipost", "memeskk", "hurdur"],
      profilePhoto: "https://source.unsplash.com/random/50x50",
      comments: 20,
    },
    {
      id: 3,
      author: "DunkerJeJeNiño",
      memeUrl: "https://source.unsplash.com/random/",
      likes: 1223,
      memeTitle: "Tio patinhas 👃",
      tags: ["shipost", "ggboy", "cringe"],
      profilePhoto: "https://source.unsplash.com/random/50x50",
      comments: 20,
    },
  ];

  return (
    <View style={styles.wrapper}>
      <TopBar name="Feed" />
      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <MemeCard postData={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
  },
});
