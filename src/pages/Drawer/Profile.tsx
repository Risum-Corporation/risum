import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import colors from "../../styles/colors";

import { fakePosts, PostProps } from "../../database/fakeData";

import { AntDesign, Ionicons } from "@expo/vector-icons";

import { MemeCardSecondary } from "../../components/MemeCardSecondary";

import { GoBackButton } from "../../components/GoBackButton";
import fonts from "../../styles/fonts";

import firebase from "../../database/firebaseConnection";
import { ProfileInfo } from "../../components/Profileinfo";

import { useNavigation } from "@react-navigation/native";

import StackContext from "../../contexts/Stack";
import AuthContext from "../../contexts/Auth";

import { Avatar } from "react-native-paper";
import { SafeZoneView } from "../../styles/Theme";
import { Loading } from "../../components/Loading";

// route.params.userId para dinamizar a tela de perfil para vários perfis diferentes
export function Profile({ route }: any) {
  const navigation = useNavigation();
  const [isSmilePressed, setIsSmilePressed] = useState<boolean>(true);
  const [isPostPressed, setIsPostPressed] = useState<boolean>();
  const [isCommentPressed, setIsCommentPressed] = useState<boolean>();
  const [isInfoPressed, setIsInfoPressed] = useState<boolean>();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [likedMemes, setLikedMemes] = useState<string[]>();

  // Objeto de memes recebidos do Firestore
  const [memeList, setMemeList] = useState<Record<string, PostProps>>({});

  // Dados para identificação do perfil do usuário
  const [userName, setUserName] = useState<string>();
  const [userAvatar, setUserAvatar] = useState<string>();
  const [isForeignUser, setIsForeignUser] = useState<boolean>(false);

  // Array de IDs dos usuários seguidos
  const [followingSet, setFollowingSet] = useState<string[]>();

  const { user } = useContext(AuthContext);

  // Theme
  const { isWhiteMode } = useContext(StackContext);

  useEffect(() => {
    async function fetchUserData() {
      // Caso o usuário seja diferente do local
      if (route.params && route.params.userId != user?.uid) {
        await firebase
          .firestore()
          .collection("users")
          .doc(route.params.userId)
          .get()
          .then((doc) => {
            const name = String(doc.data()?.userName);
            const img = String(doc.data()?.userImage);

            setUserName(name);
            setUserAvatar(img);
            setIsForeignUser(true);
          });
      }
      // Caso seja o usuário local
      else if (user) {
        setUserName(user.userName);
        setUserAvatar(user.avatar);
        setIsForeignUser(false);
      } else {
        console.log("O usuário não pode ser exibido no perfil");
      }
    }

    async function fetchFollowedUsers() {
      await firebase
        .firestore()
        .collection("users")
        .doc(user?.uid)
        .get()
        .then((doc) => {
          const followingList = [...doc.data()?.following];
          setFollowingSet(followingList);
        });
    }

    // Recebe a lista de perfis que o usuário segue
    fetchFollowedUsers();

    // Recebe e verifica as informações do usuário especificado
    fetchUserData();

    if (user?.likedMemes) {
      setLikedMemes(user.likedMemes);
      loadSmilesPage();
    }
  });

  async function loadSmilesPage(pageNumber = page) {
    // if (total && pageNumber > total) return;

    // Receber memes salvos pelo usuário
    const docs = await firebase
      .firestore()
      .collection("memes")
      .where("id", "in", likedMemes)
      .get();
    let newMemes = { ...memeList };
    // Percorre os documentos (memes) um a um
    docs.forEach((doc) => {
      // Recebe cada uma das informações do meme no Firestore
      const id = doc.data().id;
      const memeUrl = doc.data().memeUrl;
      const memeTitle = doc.data().memeTitle;
      const tags = doc.data().tags;
      const likes = doc.data().likes;
      const comments = doc.data().comments;
      const authorId = doc.data().authorId;
      const isVideo = doc.data().isVideo;

      // Atualiza a lista de memes, acrescentando UM novo objeto referente a UM novo meme
      newMemes = {
        ...newMemes,
        [id]: {
          id,
          authorId,
          memeUrl,
          likes,
          memeTitle,
          tags,
          comments,
          isVideo,
        },
      };
    });

    const totalItems = Object.keys(memeList).length;
    setMemeList(newMemes);
    setTotal(Math.floor(totalItems / 5));
    setPage(pageNumber + 1);
    setLoading(false);
  }

  function refreshList() {
    setIsRefreshing(true);
    setLoading(true);

    loadSmilesPage(1);

    // Zera o Objeto com os memes
    setMemeList({});

    setIsRefreshing(false);
  }

  function setIconsFalse() {
    setIsSmilePressed(false);
    setIsPostPressed(false);
    setIsCommentPressed(false);
    setIsInfoPressed(false);
    setMemeList({});
  }

  return (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <View style={styles.container}>
          <ProfileInfo
            theme={isWhiteMode}
            cover={require("../../assets/wallpaper.jpg")}
            avatar={userAvatar}
            userName={userName}
            userTag={user?.tag}
            isForeignUser={isForeignUser}
            followers={2}
            following={12}
            isFollower={false} // Falta automatizar
            user={user}
            whenUnfollow={() => {}}
            whenFollow={async () => {
              await firebase
                .firestore()
                .collection("users")
                .doc(user?.uid)
                .update({
                  following: [{ ...followingSet }, route.params.userId],
                })
                .then(() => {
                  Alert.alert(`${userName} seguido com sucesso!`);
                })
                .catch((error) => {
                  Alert.alert(`Ops! Algo deu errado: ${error.code}`);
                });
            }}
          />

          <View
            style={[
              styles.filterIconsBox,
              { borderBottomColor: colors.divider },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                setIconsFalse();
                setIsSmilePressed(true);
              }}
            >
              <AntDesign
                name={isSmilePressed ? "smile-circle" : "smileo"}
                color={
                  isWhiteMode
                    ? isSmilePressed
                      ? colors.purpleLight
                      : colors.whiteLight
                    : isSmilePressed
                    ? colors.green
                    : colors.white
                }
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
                color={
                  isWhiteMode
                    ? isPostPressed
                      ? colors.purpleLight
                      : colors.whiteLight
                    : isPostPressed
                    ? colors.green
                    : colors.white
                }
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
                  isCommentPressed
                    ? "chatbox-ellipses"
                    : "chatbox-ellipses-outline"
                }
                color={
                  isWhiteMode
                    ? isCommentPressed
                      ? colors.purpleLight
                      : colors.whiteLight
                    : isCommentPressed
                    ? colors.green
                    : colors.white
                }
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
                color={
                  isWhiteMode
                    ? isInfoPressed
                      ? colors.purpleLight
                      : colors.whiteLight
                    : isInfoPressed
                    ? colors.green
                    : colors.white
                }
                size={30}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            {isSmilePressed &&
              (loading ? (
                <Loading />
              ) : (
                <FlatList
                  data={Object.values(memeList)}
                  keyExtractor={(post) => String(post.id)}
                  onEndReached={() => loadSmilesPage()}
                  onRefresh={refreshList}
                  refreshing={isRefreshing}
                  onEndReachedThreshold={0.1}
                  showsVerticalScrollIndicator={false}
                  maxToRenderPerBatch={5}
                  renderItem={({ item }) => (
                    <MemeCardSecondary postData={item} theme={isWhiteMode} />
                  )}
                />
              ))}
          </View>
          <GoBackButton
            theme={isWhiteMode}
            onPress={() => navigation.goBack()}
          />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  filterIconsBox: {
    borderBottomWidth: 1,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "84%",

    paddingVertical: 7.5,
  },
  content: {
    width: "100%",
    marginTop: 18.5,
    paddingHorizontal: 30,
  },
});
