import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Share,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import SwitchMode from "../styles/SwitchMode";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface PostProps {
  postData: {
    id: number;
    author: string;
    memeUrl: string;
    likes: number;
    memeTitle: string;
    tags: string[];
    avatar: string;
    comments: number;
  };
}

export function MemeCard({ postData }: PostProps) {
  const [isLikePressed, setIsLikePressed] = useState<boolean>();
  const [isBookmarkPressed, setIsBookmarkPressed] = useState<boolean>();

  function toggleLikePress() {
    setIsLikePressed(!isLikePressed);

    if (isLikePressed) {
      postData.likes--;
    } else {
      postData.likes++;
    }
  }

  function toggleBookmarkPress() {
    setIsBookmarkPressed(!isBookmarkPressed);
  }

  async function shareMeme() {
    const shareOptions = {
      message: `Se liga nesse meme do Risum 😂: ${postData.memeUrl}`,
    };

    try {
      await Share.share(shareOptions);
    } catch (error) {
      console.log("Erro => ", error);
    }
  }

  // Theme
  let isSwitchOn = SwitchMode.isSwitchOn;

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image style={styles.memeUrl} source={{ uri: postData.memeUrl }} />
      </View>

      <View style={isSwitchOn ? styles.footerLight : styles.footer}>
        <View style={styles.buttonBox}>
          <TouchableOpacity style={styles.button} onPress={toggleLikePress}>
            <AntDesign
              name={isLikePressed ? "like1" : "like2"}
              size={24}
              color={
                isSwitchOn
                  ? isLikePressed
                    ? colors.greenLight
                    : colors.whiteLight
                  : isLikePressed
                  ? colors.green
                  : colors.white
              }
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.memeStats,
              isSwitchOn
                ? { color: colors.whiteLight }
                : { color: colors.white },
            ]}
          >
            {postData.likes}
          </Text>

          <TouchableOpacity style={styles.button}>
            <Ionicons
              name="md-chatbox-ellipses-outline"
              size={24}
              color={isSwitchOn ? colors.whiteLight : colors.white}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.memeStats,
              isSwitchOn
                ? { color: colors.whiteLight }
                : { color: colors.white },
            ]}
          >
            {postData.comments}
          </Text>

          <TouchableOpacity style={styles.button} onPress={toggleBookmarkPress}>
            <Ionicons
              name={isBookmarkPressed ? "md-bookmark" : "md-bookmark-outline"}
              size={24}
              color={
                isSwitchOn
                  ? isBookmarkPressed
                    ? colors.greenLight
                    : colors.whiteLight
                  : isBookmarkPressed
                  ? colors.green
                  : colors.white
              }
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={shareMeme}>
            <Ionicons
              name="md-share-social-outline"
              size={24}
              color={isSwitchOn ? colors.whiteLight : colors.white}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.userInfoContainer}>
          <Text
            style={[
              styles.authorName,
              isSwitchOn
                ? { color: colors.whiteLight }
                : { color: colors.white },
            ]}
          >
            {postData.author}
          </Text>
          <TouchableOpacity>
            <Image source={{ uri: postData.avatar }} style={styles.userImg} />
          </TouchableOpacity>
        </View>
      </View>

      <View // Divider between memes
        style={[
          {
            borderBottomWidth: 1,
            marginVertical: 25,
            marginHorizontal: 15,
          },
          isSwitchOn
            ? { borderBottomColor: colors.dividerLight }
            : { borderBottomColor: colors.divider },
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  memeUrl: {
    width: "92.3%",
    marginHorizontal: 15,
    height: 350,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: "cover",
  },
  footer: {
    maxWidth: "93.3%",
    flexDirection: "row",

    backgroundColor: colors.lightBackground,

    marginHorizontal: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 7.5,

    alignItems: "center",
    justifyContent: "space-between",
  },

  footerLight: {
    maxWidth: "93.3%",
    flexDirection: "row",

    backgroundColor: colors.lightBackgroundLight,

    marginHorizontal: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 7.5,

    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    marginHorizontal: 5,
  },
  buttonBox: {
    flexDirection: "row",
  },
  memeStats: {
    fontFamily: fonts.text,
    margin: 4,
  },
  userImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  authorName: {
    fontFamily: fonts.userText,
    fontSize: 14,
    textAlign: "center",

    maxWidth: 90,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  wrapper: {
    backgroundColor: colors.background,
  },
  memeList: {
    marginTop: 110,
  },
});
