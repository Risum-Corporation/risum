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

import { useNavigation } from "@react-navigation/native";

import StackContext from "../../contexts/Stack";
import AuthContext from "../../contexts/Auth";

import { Avatar } from "react-native-paper";
import { SafeZoneView } from "../../styles/Theme";

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
  const [refreshing, setRefreshing] = useState(false);
  const [memeList, setMemeList] = useState<PostProps[]>();

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
  });

  function loadPage(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) return;

    const totalItems = fakePosts.length;

    setTotal(Math.floor(totalItems / 5));
    setPage(pageNumber + 1);
    setLoading(false);
  }

  function refreshList() {
    setRefreshing(true);

    loadPage(1, true);

    setRefreshing(false);
  }

  function setIconsFalse() {
    setIsSmilePressed(false);
    setIsPostPressed(false);
    setIsCommentPressed(false);
    setIsInfoPressed(false);
  }

  return (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <View style={styles.container}>
          <Image
            source={require("../../assets/wallpaper.jpg")}
            style={styles.userWallpaper}
          />
          <View style={styles.profileInfo}>
            <View style={styles.userNameImgBox}>
              {user?.avatar ? (
                <Avatar.Image size={100} source={{ uri: userAvatar }} />
              ) : (
                <Avatar.Text
                  size={100}
                  label={`${user?.userName.substr(0, 1)}`}
                />
              )}
              <View style={{ marginTop: 20, paddingLeft: 8 }}>
                <Text
                  style={[
                    styles.userName,
                    isWhiteMode
                      ? { color: colors.whiteLight }
                      : { color: colors.white },
                  ]}
                >
                  {userName}
                </Text>
                <Text
                  style={[
                    styles.userId,
                    isWhiteMode
                      ? { color: colors.placeholderTextLight }
                      : { color: colors.placeholderText },
                  ]}
                >
                  {`#${user?.tag}`}
                </Text>
              </View>
              {
                //Exibe o botão de DEIXAR DE SEGUIR caso o usuário seja diferente do local
                followingSet?.includes(route.params.userId) ? (
                  <View style={styles.unFollowButton}>
                    <TouchableOpacity onPress={() => {}}>
                      <Text style={styles.text}>Seguir</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  // Exibe o botão de SEGUIR caso o usuário seja diferente do local
                  isForeignUser && (
                    <View style={styles.followButton}>
                      <TouchableOpacity
                        onPress={() => {
                          firebase
                            .firestore()
                            .collection("users")
                            .doc(user?.uid)
                            .update({
                              following: [
                                { ...followingSet },
                                route.params.userId,
                              ],
                            })
                            .then(() => {
                              Alert.alert(`${userName} seguido com sucesso!`);
                            })
                            .catch((error) => {
                              Alert.alert(
                                `Ops! Algo deu errado: ${error.code}`
                              );
                            });
                        }}
                      >
                        <Text style={styles.text}>Seguir</Text>
                      </TouchableOpacity>
                    </View>
                  )
                )
              }
            </View>

            <View>
              <View style={styles.lineText}>
                <Text
                  style={[
                    styles.text,
                    isWhiteMode
                      ? { color: colors.whiteLight }
                      : { color: colors.white },
                  ]}
                >
                  Seguindo
                </Text>
                <Text
                  style={[
                    styles.greenText,
                    isWhiteMode
                      ? { color: colors.purpleLight }
                      : { color: colors.green },
                  ]}
                >
                  15
                </Text>
              </View>

              <View style={styles.lineText}>
                <Text
                  style={[
                    styles.text,
                    isWhiteMode
                      ? { color: colors.whiteLight }
                      : { color: colors.white },
                  ]}
                >
                  Seguidores
                </Text>
                <Text
                  style={[
                    styles.greenText,
                    isWhiteMode
                      ? { color: colors.purpleLight }
                      : { color: colors.green },
                  ]}
                >
                  37
                </Text>
              </View>
            </View>
          </View>
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
            {isSmilePressed && (
              <FlatList
                data={fakePosts}
                keyExtractor={(post: PostProps) => String(post.id)}
                onEndReached={() => loadPage()}
                onEndReachedThreshold={0.1}
                onRefresh={refreshList}
                refreshing={refreshing}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <MemeCardSecondary postData={item} theme={isWhiteMode} />
                )}
              />
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
  text: {
    color: colors.white,
    marginHorizontal: 5,
    fontWeight: "bold",
  },
  greenText: {
    color: colors.green,
    fontWeight: "bold",
  },
  lineText: {
    marginHorizontal: 5,
    flexDirection: "row-reverse",
  },
  userWallpaper: {
    resizeMode: "cover", // IMPORTANTE! NÃO REMOVER
    height: 160,
    width: "105%",
  },
  userName: {
    fontFamily: fonts.heading,
    fontSize: 20,
    color: colors.white,
  },
  userId: {
    fontFamily: fonts.subtitle,
    fontSize: 12,
  },
  userNameImgBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -20,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
  backButton: {
    position: "absolute",
    marginTop: 20,
    flexDirection: "row-reverse",
  },
  followButton: {
    backgroundColor: colors.purple,
    padding: 10,
    borderRadius: 8,
  },
  unFollowButton: {},
});
