import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface PostProps {
  postData: {
    id: number;
    author: string;
    likes: number;
    content: string;
  };
  theme: boolean;
}

export function CommentCard({ postData, theme }: PostProps) {
  const [isLikePressed, setIsLikePressed] = useState<boolean>();

  function toggleLikePress() {
    setIsLikePressed(!isLikePressed);

    if (isLikePressed) {
      postData.likes--;
    } else {
      postData.likes++;
    }
  }

  return (
    <View>
      <View
        style={
          theme
            ? [styles.wrapper, { backgroundColor: colors.lightBackgroundLight }]
            : [styles.wrapper, { backgroundColor: colors.lightBackground }]
        }
      >
        <View>
          <Text
            style={
              theme ? { color: colors.whiteLight } : { color: colors.white }
            }
          >
            {postData.content}
          </Text>
          <TouchableOpacity>
            <Text
              style={
                theme
                  ? [styles.authorName, { color: colors.whiteLight }]
                  : [styles.authorName, { color: colors.white }]
              }
            >
              {postData.author}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.likeBox}>
          <TouchableOpacity
            style={{ marginHorizontal: 5 }}
            onPress={toggleLikePress}
          >
            <AntDesign
              name={isLikePressed ? "like1" : "like2"}
              size={24}
              color={isLikePressed ? colors.green : colors.white}
            />
          </TouchableOpacity>
          <Text
            style={
              theme ? { color: colors.whiteLight } : { color: colors.white }
            }
          >
            {postData.likes}
          </Text>
        </View>
      </View>

      <View // Divider between comments
        style={[
          {
            borderBottomWidth: 1,
            marginVertical: 10,
            marginHorizontal: 15,
          },
          {
            borderBottomColor: colors.divider,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    flex: 1,
    margin: 10,
    padding: 15,
  },
  authorName: {
    fontFamily: fonts.userText,
    fontSize: 14,
    textAlign: "center",

    maxWidth: 90,
  },
  likeBox: {
    flexDirection: "row",
    alignItems: "center",
  },
});
