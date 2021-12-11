import React, { useState, useContext, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import colors from "../../styles/colors";

import { AntDesign, Ionicons } from "@expo/vector-icons";

import { MemeCardSecondary } from "../../components/MemeCardSecondary";

import { GoBackButton } from "../../components/GoBackButton";

import firebase from "../../database/firebaseConnection";
import { ProfileInfo } from "../../components/ProfileInfo";

import { useNavigation } from "@react-navigation/native";

import StackContext from "../../contexts/Stack";
import AuthContext from "../../contexts/Auth";

import { SafeZoneView } from "../../styles/Theme";
import { Loading } from "../../components/Loading";

import { ReducedPostProps } from "../../database/interfaces";

// route.params.userId para dinamizar a tela de perfil para vários perfis diferentes
export function Profile({ route }: any) {
  const navigation = useNavigation();
  const [isSmilePressed, setIsSmilePressed] = useState<boolean>(false);
  const [isPostPressed, setIsPostPressed] = useState<boolean>(true);
  const [isCommentPressed, setIsCommentPressed] = useState<boolean>(false);
  const [isInfoPressed, setIsInfoPressed] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [likedMemes, setLikedMemes] = useState<string[]>(); // Set de IDs dos memes curtidos do perfil exibido
  const [currentUserId, setCurrentUserId] = useState<string>(
    route.params.userId
  );

  const { user } = useContext(AuthContext);

  // Objeto de memes recebidos do Firestore
  const [memeList, setMemeList] = useState<Record<string, ReducedPostProps>>(
    {}
  );

  // Dados para identificação do perfil do usuário EXIBIDO
  const [userName, setUserName] = useState<string>();
  const [userAvatar, setUserAvatar] = useState<string>();
  const [userCover, setUserCover] = useState<string>();
  const [userTag, setUserTag] = useState<string>();
  const [followers, setFollowers] = useState<number>(); // NÚMERO de seguidores
  const [following, setFollowing] = useState<number>(); // NÚMERO de pessoas seguidas pelo perfil
  const [isForeignUser, setIsForeignUser] = useState<boolean>(false);
  const [isFollowed, setIsFollowed] = useState<boolean>(false); // Define se o usuário exibido JÁ É SEGUIDO pelo perfil do usuário

  // Array de IDs dos usuários seguidos
  const [followingSet, setFollowingSet] = useState<string[]>();

  // Theme
  const { isWhiteMode } = useContext(StackContext);

  useEffect(() => {
    async function fetchUserData() {
      // Caso o usuário seja diferente do local
      if (currentUserId != user?.uid) {
        await firebase
          .firestore()
          .collection("users")
          .doc(currentUserId)
          .get()
          .then((doc) => {
            const name = String(doc.data()?.userName);
            const img = doc.data()?.avatar;
            const cover = doc.data()?.cover;
            const tag = String(doc.data()?.tag);
            const followers = Number(doc.data()?.followers.length);
            const followingList = [...doc.data()?.following];
            const following = Number(followingList.length);
            const likedMemes = [...doc.data()?.likedMemes];

            // Verifica se o perfil já está sendo seguido
            if (followingList.indexOf(currentUserId) >= 0) {
              setIsFollowed(true);
            } else {
              setIsFollowed(false);
            }

            setUserName(name);
            setUserAvatar(img);
            setUserCover(cover);
            setUserTag(tag);
            setFollowers(followers);
            setFollowing(following);
            setLikedMemes(likedMemes);
            setIsForeignUser(true);
            setLoading(false);
          })
          .catch((error) => {
            console.log(`Ocorreu um erro: ${error}`);
          });
      }
      // Caso seja o usuário local
      else if (user) {
        setUserName(user.userName);
        setUserAvatar(user.avatar!);
        setUserCover(user.cover!);
        setUserTag(user.tag);
        setFollowers(user.followers.length);
        setFollowing(user.following.length);
        setLikedMemes(user.likedMemes);
        setIsForeignUser(false);
        setCurrentUserId(user.uid);
        setLoading(false);
      } else {
        console.log("O usuário não pode ser exibido no perfil");
      }
    }

    async function fetchFollowedUsers() {
      await firebase
        .firestore()
        .collection("users")
        .doc(currentUserId)
        .get()
        .then((doc) => {
          const followingList = [...doc.data()?.following];
          setFollowingSet(followingList);
        });
    }

    // Recebe a lista de perfis que o usuário segue caso esteja num perfil diferente do local
    if (isForeignUser) {
      fetchFollowedUsers();
    }

    loadPostsPage();

    // Recebe e verifica as informações do usuário especificado
    fetchUserData();
  }, [currentUserId]);

  // Atualiza o número de seguidores do perfil exibido
  useEffect(() => {
    const totalFollowers = followingSet ? followingSet.length : 0;

    setFollowers(totalFollowers);
  }, [followingSet]);

  async function loadSmilesPage(pageNumber = page) {
    // Receber memes salvos pelo usuário
    await firebase
      .firestore()
      .collection("memes")
      .where("id", "in", likedMemes)
      .get()
      .then((docs) => {
        let newMemes = { ...memeList };
        // Percorre os documentos (memes) um a um
        docs.forEach((doc) => {
          // Recebe cada uma das informações NECESSÁRIAS do meme no Firestore
          const id = doc.data().id;
          const memeUrl = doc.data().memeUrl;
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
      });
  }

  async function loadPostsPage(pageNumber = page) {
    // if (total && pageNumber > total) return;

    // Receber memes salvos pelo usuário
    const docs = await firebase
      .firestore()
      .collection("memes")
      .where("authorId", "==", currentUserId)
      .get();
    let newMemes = { ...memeList };
    // Percorre os documentos (memes) um a um
    docs.forEach((doc) => {
      // Recebe cada uma das informações NECESSÁRIAS do meme no Firestore
      const id = doc.data().id;
      const memeUrl = doc.data().memeUrl;
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

    // Carrega a lista correspondente ao ícone atual selecionado
    if (isSmilePressed) {
      loadSmilesPage();
    } else if (isPostPressed) {
      loadPostsPage();
    }

    // Zera o Objeto com os memes
    setMemeList({});

    setIsRefreshing(false);
    setLoading(false);
  }

  function setIconsFalse() {
    setIsSmilePressed(false);
    setIsPostPressed(false);
    setIsCommentPressed(false);
    setIsInfoPressed(false);
    setMemeList({});
  }

  async function handleFollowProfile() {
    await firebase
      .firestore()
      .collection("users")
      .doc(user?.uid)
      .update({
        following: firebase.firestore.FieldValue.arrayUnion(currentUserId),
      })
      .then(() => {
        setIsFollowed(true);
      })
      .catch((error) => {
        console.log(`Ops! Algo deu errado: ${error.code}`);
      });

    await firebase
      .firestore()
      .collection("users")
      .doc(currentUserId)
      .update({
        followers: firebase.firestore.FieldValue.arrayUnion(user?.uid),
      });
  }

  async function handleUnfollowProfile() {
    await firebase
      .firestore()
      .collection("users")
      .doc(user?.uid)
      .update({
        following: firebase.firestore.FieldValue.arrayRemove(currentUserId),
      })
      .then(() => {
        setIsFollowed(false);
      });

    await firebase
      .firestore()
      .collection("users")
      .doc(currentUserId)
      .update({
        followers: firebase.firestore.FieldValue.arrayRemove(user?.uid),
      });
  }

  return (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <View style={styles.container}>
          {!loading && (
            <ProfileInfo
              theme={isWhiteMode}
              cover={userCover}
              avatar={userAvatar}
              userName={userName!}
              userTag={userTag}
              isForeignUser={isForeignUser}
              followers={followers ? followers : 0}
              following={followingSet ? followingSet.length : 0}
              isFollower={isFollowed}
              whenUnfollow={() => {
                handleUnfollowProfile();
              }}
              whenFollow={() => {
                handleFollowProfile();
              }}
            />
          )}
          <View
            style={[
              styles.filterIconsBox,
              { borderBottomColor: colors.divider },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                setIconsFalse();
                setIsPostPressed(true);
                setMemeList({});
                loadPostsPage();
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
                setIsSmilePressed(true);
                setMemeList({});
                loadSmilesPage();
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
                setIsCommentPressed(true);
                setMemeList({});
                // loadCommentsPage()
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
                setMemeList({});
                // loadInfoPage()
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
          <ScrollView style={styles.content}>
            {loading ? (
              <Loading />
            ) : (
              <FlatList
                data={Object.values(memeList)}
                keyExtractor={(post) => String(post.id)}
                onEndReached={() => {
                  if (isSmilePressed) loadSmilesPage();
                  else if (isPostPressed) loadPostsPage();
                  // Comments e Info
                }}
                onRefresh={refreshList}
                refreshing={isRefreshing}
                onEndReachedThreshold={0.1}
                showsVerticalScrollIndicator={false}
                maxToRenderPerBatch={5}
                renderItem={({ item }) => (
                  <MemeCardSecondary
                    postData={item}
                    theme={isWhiteMode}
                    isMemeAuthor={!isForeignUser && isPostPressed}
                  />
                )}
              />
            )}
          </ScrollView>
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
    paddingHorizontal: 15,
  },
});
