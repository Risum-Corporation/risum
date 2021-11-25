import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Share,
  Button,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Video } from "expo-av";

import firebase from "../database/firebaseConnection";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { useNavigation } from "@react-navigation/native";

import { PostProps } from "../database/interfaces";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

interface HypeMemeCardProps {
  theme: boolean;
  postData: PostProps;
}

export function HypeMemeCard({ theme, postData }: HypeMemeCardProps) {
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
          setAvatar(String(doc.data().avatar));
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
  const [status, setStatus] = React.useState({});

  return (
    <>
      <View style={styles.memeUrlContainer}>
        {postData.isVideo ? (
          <Video
            ref={video}
            style={styles.memeUrl}
            source={{
              uri: postData.memeUrl,
            }}
            resizeMode="cover"
            isLooping
            isMuted={true}
            shouldPlay={true}
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        ) : (
          <Image style={styles.memeUrl} source={{ uri: postData.memeUrl }} />
        )}
      </View>

      {/* <TouchableWithoutFeedback
        onPress={() =>
          status.isPlaying
            ? video.current.pauseAsync()
            : video.current.playAsync()
        }
      >
        <View style={styles.pause}></View>
      </TouchableWithoutFeedback> */}
      <View style={styles.actionButtons}>
        <View style={styles.buttonBox}>
          <TouchableOpacity style={styles.button} onPress={toggleLikePress}>
            <AntDesign
              name="like1"
              size={24}
              color={
                isLikePressed
                  ? theme
                    ? colors.greenLight
                    : colors.green
                  : colors.white
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Comments");
            }}
          >
            <Ionicons
              name="md-chatbox-ellipses"
              size={24}
              color={colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleBookmarkPress}>
            <Ionicons
              name="md-bookmark"
              size={24}
              color={
                isBookmarkPressed
                  ? theme
                    ? colors.greenLight
                    : colors.green
                  : colors.white
              }
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={shareMeme}>
            <Ionicons name="md-share-social" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.userInfoContainer}></View>
      </View>
      <View style={styles.userImgContainer}>
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

      <Text style={[styles.authorName, { color: colors.white }]}>{author}</Text>

      {postData.likes === 1 ? (
        <Text style={[styles.memeInfo, { color: colors.white }]}>
          {postData.memeTitle}
          {"\n"}
          {postData.likes} like e {postData.comments} comentários
        </Text>
      ) : (
        <Text style={[styles.memeInfo, { color: colors.white }]}>
          {postData.memeTitle}
          {"\n"}
          {postData.likes} likes e {postData.comments} comentários
        </Text>
      )}

      <View style={styles.separator} />
    </>
  );
}

const styles = StyleSheet.create({
  memeUrl: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  memeUrlContainer: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    position: "absolute",
  },
  pause: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  buttonBox: {
    position: "absolute",
    bottom: "5%",
  },
  button: {
    marginTop: 15,
  },
  userInfoContainer: {
    marginTop: "180%",
    alignItems: "center",
  },
  authorName: {
    fontFamily: fonts.userText,
    fontSize: 14,
    position: "absolute",
    right: "15%",
    bottom: "7.1%",
    textAlign: "right",
    backgroundColor: "#31313125",
  },
  userImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  userImgContainer: { position: "absolute", bottom: "5.5%", right: "3%" },

  actionButtons: {
    flexDirection: "row",
    marginHorizontal: 6,
  },
  memeInfo: {
    fontFamily: fonts.userText,
    fontSize: 14,
    position: "absolute",
    right: "5%",
    top: "3%",
    textAlign: "right",
    backgroundColor: "#31313125",
  },
  separator: {
    height: "0.5%",
  },
});
