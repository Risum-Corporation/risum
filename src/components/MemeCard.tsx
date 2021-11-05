import React, { useEffect, useState } from "react";
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

import { Video } from "expo-av";

import firebase from "../database/firebaseConnection";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { useNavigation } from "@react-navigation/native";

import { PostProps } from "../database/fakeData";

interface MemeCardProps {
  theme: boolean;
  postData: PostProps;
}

export function MemeCard({ theme, postData }: MemeCardProps) {
  const [isLikePressed, setIsLikePressed] = useState<boolean>();
  const [isBookmarkPressed, setIsBookmarkPressed] = useState<boolean>();
  const navigation = useNavigation();

  // Propriedades da pessoa que postou o meme
  const [author, setAuthor] = useState<string>();
  const [avatar, setAvatar] = useState<string>();

  useEffect(() => {
    // Recebe as informações do dono do meme para display no MemeCard
    function fetchUserProfileInfo() {
      firebase
        .firestore()
        .collection("users")
        .doc(postData.authorId)
        .get()
        .then((doc: any) => {
          setAuthor(String(doc.data().userName));
          setAvatar(String(doc.data().userImage));
        })
        .catch((error) => {
          console.log(
            `Não foi possível receber as informações do usuário devido ao seguinte erro: ${error}`
          );
        });
    }

    fetchUserProfileInfo();
  }, []);

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
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({})
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
            resizeMode="contain"
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
                    ? colors.greenLight
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
            {postData.likes}
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Comments");
            }}
          >
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
                    ? colors.greenLight
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
        </View>

        <View style={styles.userInfoContainer}>
          <Text
            style={[
              styles.authorName,
              { color: theme ? colors.whiteLight : colors.white },
            ]}
          >
            {author}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile", { userId: postData.authorId });
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
            borderBottomWidth: 1,
            marginVertical: 25,
            marginHorizontal: 15,
          },
          {
            borderBottomColor: theme
              ? colors.placeholderTextLight
              : colors.divider,
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
    width: 365,
    marginHorizontal: 15,
    height: 350,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: "cover",
  },
  footer: {
    maxWidth: "93.1%",
    flexDirection: "row",

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
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  wrapper: {
    backgroundColor: colors.background,
  },
});
