import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import firebase from "../database/firebaseConnection";

import { Video } from "expo-av";

import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import { ReducedPostProps } from "../database/interfaces";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../contexts/Auth";

interface MemeCardSecondaryProps {
  theme: boolean;
  postData: ReducedPostProps;
  isMemeAuthor: boolean;
}

export function MemeCardSecondary({
  theme,
  postData,
  isMemeAuthor,
}: MemeCardSecondaryProps) {
  const [isLikePressed, setIsLikePressed] = useState<boolean>();
  const [isBookmarkPressed, setIsBookmarkPressed] = useState<boolean>();
  const [likes, setLikes] = useState<number>();

  const navigation = useNavigation();

  const { user } = useContext(AuthContext);

  // Propriedades da pessoa que postou o meme
  const [avatar, setAvatar] = useState<string>();

  useEffect(() => {
    // Recebe as informações do dono do meme para display no MemeCard
    async function fetchUserProfileInfo() {
      await firebase
        .firestore()
        .collection("users")
        .doc(postData.authorId)
        .get()
        .then((doc) => {
          const avatar = String(doc.data()?.avatar);

          setAvatar(avatar);
        })
        .catch((error) => {
          console.log(
            `Não foi possível receber as informações do usuário devido ao seguinte erro: ${error}`
          );
        });
    }

    fetchUserProfileInfo();

    async function fetchMemeInfo() {
      await firebase
        .firestore()
        .collection("memes")
        .doc(postData.id)
        .get()
        .then((doc) => {
          const postLikes = Number(doc.data()?.likes);

          setLikes(postLikes);
        });
    }

    fetchMemeInfo();

    // Verifica se o usuário já possui informações daquele meme (Ex: já deu like antes, já salvou antes, etc.)
    function verifyBehaviourOnMeme() {
      // Verifica se o usuário já deu like anteriormente
      if (user?.likedMemes.includes(postData.id)) {
        setIsLikePressed(true);
      } else {
        setIsLikePressed(false);
      }

      // Verifica se o usuário já salvou o meme anteriormente
      if (user?.savedMemes.includes(postData.id)) {
        setIsBookmarkPressed(true);
      } else {
        setIsBookmarkPressed(false);
      }
    }

    verifyBehaviourOnMeme();
  }, []);

  async function toggleLikePress() {
    setIsLikePressed(!isLikePressed);

    if (isLikePressed) {
      // REMOVE um like no meme
      await firebase
        .firestore()
        .collection("memes")
        .doc(postData.id)
        .update({ likes: postData.likes - 1 })
        .then(() => {
          // Atualiza visualmente os likes
          postData.likes--;
          setLikes(postData.likes);
        });

      // Atualiza a lista de memes curtidos em cache
      user?.likedMemes.splice(user.likedMemes.indexOf(postData.id), 1);

      // Atualiza a lista de memes curtidos pelo usuário
      await firebase
        .firestore()
        .collection("users")
        .doc(user?.uid)
        .update({ likedMemes: user?.likedMemes });
    } else {
      // ADICIONA um like no meme
      await firebase
        .firestore()
        .collection("memes")
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
        .update({ likedMemes: user?.likedMemes });
    }
  }

  async function toggleBookmarkPress() {
    setIsBookmarkPressed(!isBookmarkPressed);

    if (isBookmarkPressed) {
      // Atualiza a lista de memes salvos em cache (REMOVE)
      user?.savedMemes.splice(user.savedMemes.indexOf(postData.id), 1);

      // Atualiza a lista de memes salvos pelo usuário
      await firebase
        .firestore()
        .collection("users")
        .doc(user?.uid)
        .update({ savedMemes: user?.savedMemes });
    } else {
      // Atualiza a lista de memes salvos em cache (ADICIONA)
      user?.savedMemes.push(postData.id);

      await firebase
        .firestore()
        .collection("users")
        .doc(user?.uid)
        .update({ savedMemes: user?.savedMemes });
    }
  }

  async function shareMeme() {
    let meme = FileSystem.downloadAsync(
      postData.memeUrl,
      FileSystem.documentDirectory + ".jpg"
    );

    if (postData.isVideo) {
      meme = FileSystem.downloadAsync(
        postData.memeUrl,
        FileSystem.documentDirectory + ".mp4"
      );
    }

    const options = {
      dialogTitle: `Se liga nesse meme do Risum 😂`,
    };

    Sharing.shareAsync((await meme).uri, options); // And share your file !
  }

  function deleteMeme() {
    Alert.alert(
      "Você realmente deseja apagar este meme?",
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
              .collection("memes")
              .doc(postData.id)
              .delete()
              .then(() => {
                Alert.alert("Meme deletado com sucesso");
              });
          },
        },
      ],
      { cancelable: false }
    );
  }

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {postData.isVideo ? (
          <Video
            ref={video}
            style={styles.memeUrl}
            source={{
              uri: postData.memeUrl,
            }}
            useNativeControls
            resizeMode="cover"
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        ) : (
          <Image style={styles.memeUrl} source={{ uri: postData.memeUrl }} />
        )}
      </View>

      <View
        style={[
          styles.footer,
          {
            backgroundColor: theme
              ? colors.lightBackgroundLight
              : colors.lightBackground,
          },
        ]}
      >
        <View style={styles.buttonBox}>
          <TouchableOpacity style={styles.button} onPress={toggleLikePress}>
            <AntDesign
              name={isLikePressed ? "like1" : "like2"}
              size={24}
              color={
                isLikePressed
                  ? theme
                    ? colors.purpleLight
                    : colors.green
                  : theme
                  ? colors.whiteLight
                  : colors.white
              }
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.memeStats,
              { color: theme ? colors.whiteLight : colors.white },
            ]}
          >
            {likes}
          </Text>

          <TouchableOpacity style={styles.button}>
            <Ionicons
              name="md-chatbox-ellipses-outline"
              size={24}
              color={theme ? colors.whiteLight : colors.white}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.memeStats,
              { color: theme ? colors.whiteLight : colors.white },
            ]}
          >
            {postData.comments}
          </Text>

          <TouchableOpacity style={styles.button} onPress={toggleBookmarkPress}>
            <Ionicons
              name={isBookmarkPressed ? "md-bookmark" : "md-bookmark-outline"}
              size={24}
              color={
                isBookmarkPressed
                  ? theme
                    ? colors.purpleLight
                    : colors.green
                  : theme
                  ? colors.whiteLight
                  : colors.white
              }
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={shareMeme}>
            <Ionicons
              name="md-share-social-outline"
              size={24}
              color={theme ? colors.whiteLight : colors.white}
            />
          </TouchableOpacity>

          {isMemeAuthor && (
            <TouchableOpacity style={styles.button} onPress={deleteMeme}>
              <Ionicons name="trash" size={24} color={colors.pastelRed} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.userInfoContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Comments", { memeId: postData.id });
            }}
            onLongPress={() => {
              Alert.alert(`ID do Meme: ${postData.id}`);
            }}
          >
            <Image
              source={
                avatar ? { uri: avatar } : require("../assets/risumDefault.png")
              }
              style={styles.userImg}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View // Divider between memes
        style={[
          {
            borderBottomColor: colors.divider,
            borderBottomWidth: 1,
            marginVertical: 15,
            marginHorizontal: "2%",
          },
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
    width: "100%",
    marginHorizontal: 15,
    height: 250,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: "cover",
  },
  footer: {
    width: "100%",
    flexDirection: "row",

    marginHorizontal: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 7.5,

    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 0,
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
