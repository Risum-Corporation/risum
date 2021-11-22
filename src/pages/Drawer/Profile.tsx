import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
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

import { ReducedPostProps } from "../../database/fakeData";

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
  const [userTag, setUserTag] = useState<string>();
  const [followers, setFollowers] = useState<number>(); // NÚMERO de seguidores
  const [following, setFollowing] = useState<number>(); // NÚMERO de pessoas seguidas pelo perfil
  const [isForeignUser, setIsForeignUser] = useState<boolean>(false);

  // Array de IDs dos usuários seguidos
  const [followingSet, setFollowingSet] = useState<string[]>();

  // Theme
  const { isWhiteMode } = useContext(StackContext);

  useEffect(() => {
    async function fetchUserData() {
      // Caso o usuário seja diferente do local
      if (currentUserId != user?.uid) {
        console.log(currentUserId);
        await firebase
          .firestore()
          .collection("users")
          .doc(currentUserId)
          .get()
          .then((doc) => {
            const name = String(doc.data()?.userName);
            const img = String(doc.data()?.avatar);
            const tag = String(doc.data()?.tag);
            const followers = Number(doc.data()?.followers.length);
            const following = Number(doc.data()?.following.length);

            setUserName(name);
            setUserAvatar(img);
            setUserTag(tag);
            setFollowers(followers);
            setFollowing(following);
            setIsForeignUser(true);
            setLoading(false);
          })
          .catch((error) => {
            console.log(`Deu ruim: ${error}`);
          });
      }
      // Caso seja o usuário local
      else if (user) {
        setUserName(user.userName);
        setUserAvatar(user.avatar!);
        setUserTag(user.tag);
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

      await firebase
        .firestore()
        .collection("users")
        .doc(currentUserId)
        .get()
        .then((doc) => {
          const likedMemeList = [...doc.data()?.likedMemes];
          setLikedMemes(likedMemeList);
          console.log(`Memes curtidos: ${likedMemes}`);
        });
    }

    // Recebe a lista de perfis que o usuário segue caso esteja num perfil diferente do local
    if (isForeignUser) {
      fetchFollowedUsers();
    }

    // Recebe e verifica as informações do usuário especificado
    fetchUserData();
  }, [currentUserId]);

  useEffect(() => {
    if (likedMemes?.length) {
      loadSmilesPage();
    } else {
      console.log("Sem memes curtidos");
      setLoading(false);
      // Exibir componente semelhante ao NoAccount, onde o usuário é instruído a seguir páginas
    }
  }, [likedMemes]);

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

  return (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <View style={styles.container}>
          {!loading && (
            <ProfileInfo
              theme={isWhiteMode}
              cover={user?.cover}
              avatar={userAvatar}
              userName={userName!}
              userTag={userTag}
              isForeignUser={isForeignUser}
              followers={followers ? followers : 0}
              following={followingSet ? followingSet.length : 0}
              isFollower={false} // Falta automatizar
              whenUnfollow={() => {}}
              whenFollow={async () => {
                await firebase
                  .firestore()
                  .collection("users")
                  .doc(user?.uid)
                  .update({
                    following: [{ ...followingSet }, currentUserId],
                  })
                  .then(() => {
                    Alert.alert(`${userName} seguido com sucesso!`);
                  })
                  .catch((error) => {
                    Alert.alert(`Ops! Algo deu errado: ${error.code}`);
                  });
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
            {isSmilePressed ? (
              loading ? (
                <Loading />
              ) : (
                <FlatList
                  data={Object.values(memeList)}
                  keyExtractor={(post) => String(post.id)}
                  //onEndReached={() => loadSmilesPage()}
                  onRefresh={refreshList}
                  refreshing={isRefreshing}
                  onEndReachedThreshold={0.1}
                  showsVerticalScrollIndicator={false}
                  maxToRenderPerBatch={5}
                  renderItem={({ item }) => (
                    <MemeCardSecondary postData={item} theme={isWhiteMode} />
                  )}
                />
              )
            ) : (
              isPostPressed &&
              (loading ? (
                <Loading />
              ) : (
                <FlatList
                  data={Object.values(memeList)}
                  keyExtractor={(post) => String(post.id)}
                  onEndReached={() => loadPostsPage()}
                  onRefresh={refreshList}
                  refreshing={isRefreshing}
                  onEndReachedThreshold={0.1}
                  showsVerticalScrollIndicator={false}
                  maxToRenderPerBatch={5}
                  renderItem={({ item }) => (
                    <MemeCardSecondary postData={item} theme={isWhiteMode} />
                  )}
                />
              ))
            )}
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
