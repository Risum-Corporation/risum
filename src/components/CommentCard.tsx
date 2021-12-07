import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { SimpleText } from "../styles/Theme";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import firebase from "../database/firebaseConnection";

import { CommentProps } from "../database/interfaces";
import AuthContext from "../contexts/Auth";

interface CommentCardProps {
  postData: CommentProps;
  theme: boolean;
}

export function CommentCard({ postData, theme }: CommentCardProps) {
  const [isLikePressed, setIsLikePressed] = useState<boolean>();

  // Propriedades da pessoa que postou o comentário
  const [author, setAuthor] = useState<string>();
  const [avatar, setAvatar] = useState<string>();

  const [likes, setLikes] = useState<number>();

  const { user } = useContext(AuthContext);

  async function toggleLikePress() {
    setIsLikePressed(!isLikePressed);

    if (isLikePressed) {
      // REMOVE um like no meme
      await firebase
        .firestore()
        .collection("comments")
        .doc(postData.id)
        .update({ likes: postData.likes - 1 })
        .then(() => {
          // Atualiza visualmente os likes
          postData.likes--;
          setLikes(postData.likes);
        });

      // Atualiza a lista de memes curtidos em cache
      user?.likedComments.splice(user.likedComments.indexOf(postData.id), 1);

      // Atualiza a lista de memes curtidos pelo usuário
      await firebase
        .firestore()
        .collection("users")
        .doc(user?.uid)
        .update({ likedComments: user?.likedComments });
    } else {
      // ADICIONA um like no meme
      await firebase
        .firestore()
        .collection("comments")
        .doc(postData.id)
        .update({ likes: postData.likes + 1 })
        .then(() => {
          postData.likes++;
          setLikes(postData.likes);
        });

      // Atualiza a lista de memes curtidos em cache
      user?.likedMemes.push(postData.id);

      await firebase
        .firestore()
        .collection("users")
        .doc(user?.uid)
        .update({ likedComments: user?.likedComments });
    }
  }

  useEffect(() => {
    // Recebe as informações do dono do comentário para exibir
    async function fetchUserProfileInfo() {
      await firebase
        .firestore()
        .collection("users")
        .doc(postData.authorId)
        .get()
        .then((doc) => {
          setAuthor(String(doc.data()?.userName));
          setAvatar(String(doc.data()?.avatar));
        })
        .catch((error) => {
          console.log(
            `Não foi possível receber as informações do usuário devido ao seguinte erro: ${error}`
          );
        });
    }

    fetchUserProfileInfo();

    async function fetchCommentInfo() {
      await firebase
        .firestore()
        .collection("comments")
        .doc(postData.id)
        .get()
        .then((doc) => {
          const postLikes = Number(doc.data()?.likes);

          setLikes(postLikes);
        });
    }

    fetchCommentInfo();

    // Verifica se o usuário já possui informações daquele comentário (Ex: já deu like antes)
    function verifyBehaviourOnComment() {
      // Verifica se o usuário já deu like anteriormente
      if (user?.likedComments.includes(postData.id)) {
        setIsLikePressed(true);
      } else {
        setIsLikePressed(false);
      }
    }

    verifyBehaviourOnComment();
  }, []);

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
          <SimpleText theme={theme} title={postData.content} />
          <TouchableOpacity>
            <Image
              source={
                avatar ? { uri: avatar } : require("../assets/risumDefault.png")
              }
              style={styles.authorImage}
            />
            <Text
              style={
                theme
                  ? [styles.authorName, { color: colors.whiteLight }]
                  : [styles.authorName, { color: colors.white }]
              }
            >
              {author}
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
            {likes}
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
            borderBottomColor: theme
              ? colors.placeholderTextLight
              : colors.divider,
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
  authorImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
