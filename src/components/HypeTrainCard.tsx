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

export function HypeTrainCard({ postData }: PostProps) {
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

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image style={styles.memeUrl} source={{ uri: postData.memeUrl }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: 500,
  },
  memeUrl: {
    width: "100%",
    marginHorizontal: 15,
    height: "100%",
    borderTopLeftRadius: 10,
    paddingRight: 10,
    borderTopRightRadius: 10,
    resizeMode: "cover",
  },
  footer: {
    maxWidth: "92.3%",
    flexDirection: "row",

    backgroundColor: colors.lightBackground,

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
    color: colors.white,
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

    color: colors.white,
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
