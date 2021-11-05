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

import { PostProps } from "../database/fakeData";
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
      {/* {postData.isVideo ? (
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
        )} */}
      <Video
        ref={video}
        style={styles.memeUrl}
        source={{
          uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        resizeMode="cover"
        isLooping
        isMuted={true}
        shouldPlay={true}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      {/* <TouchableWithoutFeedback
        onPress={() =>
          status.isPlaying
            ? video.current.pauseAsync()
            : video.current.playAsync()
        }
      >
        <View style={styles.pause}></View>
      </TouchableWithoutFeedback>  */}
      <View style={styles.actionButtons}>
        <View style={styles.buttonBox}>
          <TouchableOpacity style={styles.button} onPress={shareMeme}>
            <AntDesign
              name="like1"
              size={24}
              color={theme ? colors.whiteLight : colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={shareMeme}>
            <Ionicons
              name="md-chatbox-ellipses"
              size={24}
              color={theme ? colors.whiteLight : colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={shareMeme}>
            <Ionicons
              name="md-bookmark"
              size={24}
              color={theme ? colors.whiteLight : colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={shareMeme}>
            <Ionicons
              name="md-share-social"
              size={24}
              color={theme ? colors.whiteLight : colors.white}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.userInfoContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile");
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
      <Text
        style={[
          styles.authorName,
          { color: theme ? colors.whiteLight : colors.white },
        ]}
      >Sapekaaaaa</Text>
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
    height: "100%",
    width: "100%",
  },
  pause: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: "red",
  },
  buttonBox: {
    justifyContent: "flex-end",
    paddingRight: "90%",
  },
  button: {
    marginTop: 15,
    marginLeft: 10,
  },
  userInfoContainer: {
    marginTop: "180%",
    flexDirection: "row",
    alignItems: "center",
  },
  authorName: {
    fontFamily: fonts.userText,
    fontSize: 14,
    position: "absolute",
    backgroundColor: "red",
    justifyContent: 'flex-end',
  },
  userImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  actionButtons: {
    flexDirection: "row",
    marginHorizontal: 30,
  },
});
