import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import colors from "../styles/colors";

import { AntDesign, Ionicons } from "@expo/vector-icons";

import { MemeCardSecondary } from "../components/MemeCardSecondary";

import { GoBackButton } from "../components/GoBackButton";
import fonts from "../styles/fonts";

import { useNavigation } from "@react-navigation/native";

export function Profile() {
  const navigation = useNavigation();
  const [isSmilePressed, setIsSmilePressed] = useState<boolean>(true);
  const [isPostPressed, setIsPostPressed] = useState<boolean>();
  const [isCommentPressed, setIsCommentPressed] = useState<boolean>();
  const [isInfoPressed, setIsInfoPressed] = useState<boolean>();

  function setIconsFalse() {
    setIsSmilePressed(false);
    setIsPostPressed(false);
    setIsCommentPressed(false);
    setIsInfoPressed(false);
  }

  // Fake posts
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
    {
      id: 4,
      author: "DunkerJeJeNiño",
      memeUrl: "https://source.unsplash.com/random/",
      likes: 1223,
      memeTitle: "Tio patinhas 👃",
      tags: ["shipost", "ggboy", "cringe"],
      profilePhoto: "https://source.unsplash.com/random/50x50",
      comments: 20,
    },
    {
      id: 5,
      author: "DunkerJeJeNiño",
      memeUrl: "https://source.unsplash.com/random/",
      likes: 1223,
      memeTitle: "Tio patinhas 👃",
      tags: ["shipost", "ggboy", "cringe"],
      profilePhoto: "https://source.unsplash.com/random/50x50",
      comments: 20,
    },
    {
      id: 6,
      author: "DunkerJeJeNiño",
      memeUrl: "https://source.unsplash.com/random/",
      likes: 1223,
      memeTitle: "Tio patinhas 👃",
      tags: ["shipost", "ggboy", "cringe"],
      profilePhoto: "https://source.unsplash.com/random/50x50",
      comments: 20,
    },
    {
      id: 7,
      author: "DunkerJeJeNiño",
      memeUrl: "https://source.unsplash.com/random/",
      likes: 1223,
      memeTitle: "Tio patinhas 👃",
      tags: ["shipost", "ggboy", "cringe"],
      profilePhoto: "https://source.unsplash.com/random/50x50",
      comments: 20,
    },
    {
      id: 8,
      author: "DunkerJeJeNiño",
      memeUrl: "https://source.unsplash.com/random/",
      likes: 1223,
      memeTitle: "Tio patinhas 👃",
      tags: ["shipost", "ggboy", "cringe"],
      profilePhoto: "https://source.unsplash.com/random/50x50",
      comments: 20,
    },
    {
      id: 9,
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
    <View style={styles.container}>
      <Image
        source={require("../assets/wallpaper.jpg")}
        style={styles.userWallpaper}
      />
      <View style={styles.profileInfo}>
        <View style={styles.userNameImgBox}>
          <Image
            source={require("../assets/profilePicture.png")}
            style={styles.profilePicture}
          />
          <View>
            <Text style={styles.userName}>Usuário</Text>
            <Text style={styles.userId}>#1234</Text>
          </View>
        </View>

        <View>
          <View style={styles.lineText}>
            <Text style={styles.greenText}>15</Text>
            <Text style={styles.text}>Seguindo</Text>
          </View>

          <View style={styles.lineText}>
            <Text style={styles.greenText}>37</Text>
            <Text style={styles.text}>Seguidores</Text>
          </View>
        </View>
      </View>
      <View style={styles.filterIconsBox}>
        <TouchableOpacity
          onPress={() => {
            setIconsFalse();
            setIsSmilePressed(true);
          }}
        >
          <AntDesign
            name={isSmilePressed ? "smile-circle" : "smileo"}
            color={isSmilePressed ? colors.green : colors.white}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIconsFalse();
            setIsPostPressed(true);
          }}
        >
          <Ionicons
            name={isPostPressed ? "image" : "image-outline"}
            color={isPostPressed ? colors.green : colors.white}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIconsFalse();
            setIsCommentPressed(true);
          }}
        >
          <Ionicons
            name={
              isCommentPressed ? "chatbox-ellipses" : "chatbox-ellipses-outline"
            }
            color={isCommentPressed ? colors.green : colors.white}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIconsFalse();
            setIsInfoPressed(true);
          }}
        >
          <Ionicons
            name={
              isInfoPressed
                ? "information-circle"
                : "information-circle-outline"
            }
            color={isInfoPressed ? colors.green : colors.white}
            size={30}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {(isSmilePressed || isPostPressed) && (
          <FlatList
            data={posts}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <MemeCardSecondary postData={item} />}
            numColumns={3}
          />
        )}
      </View>
      <GoBackButton onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 10,
  },
  text: {
    color: colors.white,
    marginHorizontal: 5,
  },
  greenText: {
    color: colors.green,
  },
  lineText: {
    flexDirection: "row",
    marginHorizontal: 5,
  },
  userWallpaper: {
    resizeMode: "cover", // IMPORTANTE! NÃO REMOVER
    height: 160,
    width: "105%",
  },
  userName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.white,
  },
  userId: {
    fontFamily: fonts.subtitle,
    fontSize: 12,
    color: colors.placeholderText,
  },
  userNameImgBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  filterIconsBox: {
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",

    paddingHorizontal: 15,
    paddingVertical: 7.5,
  },
  content: {
    width: "100%",
    marginTop: 18.5,
  },
});
