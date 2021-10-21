import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import colors from "../../styles/colors";

import { posts } from "../../database/fakeData";

import { AntDesign, Ionicons } from "@expo/vector-icons";

import { MemeCardSecondary } from "../../components/MemeCardSecondary";

import { GoBackButton } from "../../components/GoBackButton";
import fonts from "../../styles/fonts";

import firebase from '../../database/firebaseConnection'

import { useNavigation } from "@react-navigation/native";

import StackContext from "../../contexts/Stack";
import AuthContext from "../../contexts/Auth";

import { Avatar } from "react-native-paper";

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

  const { user } = useContext(AuthContext);

  // Theme
  const { isWhiteMode } = useContext(StackContext);

  // Fetch memes from database
  // useEffect(() => {
    
  // }, [])

  function loadPage(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) return;

    const totalItems = posts.length;

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
    <View
      style={[
        styles.container,
        isWhiteMode
          ? { backgroundColor: colors.backgroundLight }
          : { backgroundColor: colors.background },
      ]}
    >
      <Image
        source={require("../../assets/wallpaper.jpg")}
        style={styles.userWallpaper}
      />
      <View style={styles.profileInfo}>
        <View style={styles.userNameImgBox}>
          {user?.avatar ? (
            <Avatar.Image size={100} source={{ uri: user.avatar }} />
          ) : (
            <Avatar.Text size={100} label={`${user?.userName.substr(0, 1)}`} />
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
              {user?.userName}
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
        style={[styles.filterIconsBox, { borderBottomColor: colors.divider }]}
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
              isCommentPressed ? "chatbox-ellipses" : "chatbox-ellipses-outline"
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
        {
        isSmilePressed && (
         <FlatList
            data={posts}
            keyExtractor={(post) => String(post.id)}
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
        {isPostPressed && (
          <FlatList
          data={posts}
          keyExtractor={(post) => String(post.id)}
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
      <GoBackButton theme={isWhiteMode} onPress={() => navigation.goBack()} />
    </View>
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
});
