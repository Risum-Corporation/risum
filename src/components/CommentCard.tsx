import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { SafeZoneView, SimpleText } from "../styles/Theme";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import firebase from "../database/firebaseConnection";

import { CommentProps } from "../database/interfaces";
import AuthContext from "../contexts/Auth";
import { useNavigation } from "@react-navigation/native";
import StackContext from "../contexts/Stack";

interface CommentCardProps {
  postData: CommentProps;
  theme: boolean;
}

export function CommentCard({ postData, theme }: CommentCardProps) {
  const navigation = useNavigation();
  const [isLikePressed, setIsLikePressed] = useState<boolean>();

  // Propriedades da pessoa que postou o comentário
  const [author, setAuthor] = useState<string>();
  const [avatar, setAvatar] = useState<string>();

  const [likes, setLikes] = useState<number>();

  // Theme
  const { isWhiteMode } = useContext(StackContext);

  const { user } = useContext(AuthContext);

  async function toggleLikePress() {
    setIsLikePressed(!isLikePressed);

    if (isLikePressed) {
      // REMOVE um like do comentário
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
      // ADICIONA um like no comentário
      await firebase
        .firestore()
        .collection("comments")
        .doc(postData.id)
        .update({ likes: postData.likes + 1 })
        .then(() => {
          postData.likes++;
          setLikes(postData.likes);
        });

      // Atualiza a lista de comentários curtidos em cache
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

  function deleteComment() {
    Alert.alert(
      "Você realmente deseja apagar este comentário?",
      "Esta ação não poderá ser desfeita!",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: async () => {
            await firebase
              .firestore()
              .collection("comments")
              .doc(postData.id)
              .delete()
              .then(async () => {
                await firebase
                  .firestore()
                  .collection("memes")
                  .doc(postData.memeId)
                  .update({
                    comments: firebase.firestore.FieldValue.increment(-1),
                  })
                  .then(() => {
                    Alert.alert("Comentário deletado com sucesso");
                  });
              });
          },
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <>
          <View
            style={
              theme
                ? [
                    styles.wrapper,
                    { backgroundColor: colors.lightBackgroundLight },
                  ]
                : [styles.wrapper, { backgroundColor: colors.lightBackground }]
            }
          >
            <View style={styles.content}>
              <SimpleText theme={theme} title={postData.content} size={20} />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Profile", { userId: postData.authorId });
                }}
                style={styles.authorBox}
              >
                <Image
                  source={
                    avatar
                      ? { uri: avatar }
                      : require("../assets/risumDefault.png")
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

            <View style={styles.buttonsBox}>
              <TouchableOpacity style={styles.button} onPress={toggleLikePress}>
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

              {/* Exibe o botão de apagar caso o dono do comentário seja o usuário local */}
              {postData.authorId == user?.uid && (
                <TouchableOpacity style={styles.button} onPress={deleteComment}>
                  <Ionicons name="trash" size={24} color={colors.pastelRed} />
                </TouchableOpacity>
              )}
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
        </>
      }
    ></SafeZoneView>
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
  buttonsBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  authorImage: {
    width: 25,
    height: 25,
    borderRadius: 10,
    marginRight: 5,
  },
  authorBox: {
    flexDirection: "row",
    marginTop: 10,
  },
  content: {
    padding: 2.5,
    alignContent: "center",
    maxWidth: 250,
  },
  button: {
    marginHorizontal: 5,
  },
});
