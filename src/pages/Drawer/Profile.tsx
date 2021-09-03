import React, { useEffect, useState } from "react";
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

import { useNavigation } from "@react-navigation/native";
import { Loading } from "../../components/Loading";

export function Profile() {
  const navigation = useNavigation();
  const [isSmilePressed, setIsSmilePressed] = useState<boolean>(true);
  const [isPostPressed, setIsPostPressed] = useState<boolean>();
  const [isCommentPressed, setIsCommentPressed] = useState<boolean>();
  const [isInfoPressed, setIsInfoPressed] = useState<boolean>();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  function loadPage(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) return;

    const totalItems = posts.length;

    setTotal(Math.floor(totalItems / 5));
    setPage(pageNumber + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadPage();
  }, []);

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
    <View style={styles.container}>
      <Image
        source={require("../../assets/wallpaper.jpg")}
        style={styles.userWallpaper}
      />
      <View style={styles.profileInfo}>
        <View style={styles.userNameImgBox}>
          <Image
            source={require("../../assets/profilePicture.png")}
            style={styles.profilePicture}
          />
          <View style={{ marginTop: 20, paddingLeft: 8 }}>
            <Text style={styles.userName}>Usuário</Text>
            <Text style={styles.userId}>#1234</Text>
          </View>
        </View>

        <View>
          <View style={styles.lineText}>
            <Text style={styles.text}>Seguindo</Text>
            <Text style={styles.greenText}>15</Text>
          </View>

          <View style={styles.lineText}>
            <Text style={styles.text}>Seguidores</Text>
            <Text style={styles.greenText}>37</Text>
          </View>
        </View>
      </View>
      <View style={styles.filterIconsBox}>
        <TouchableOpacity
          onPress={() => {
            setIconsFalse();
            setIsSmilePressed(true);
          }}
        >
          <AntDesign
            name={isSmilePressed ? "smile-circle" : "smileo"}
            color={isSmilePressed ? colors.green : colors.white}
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
            color={isPostPressed ? colors.green : colors.white}
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
            color={isCommentPressed ? colors.green : colors.white}
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
            color={isInfoPressed ? colors.green : colors.white}
            size={30}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {(isSmilePressed || isPostPressed) && (
          <FlatList
            data={posts}
            keyExtractor={(post) => String(post.id)}
            onEndReached={() => loadPage()}
            onEndReachedThreshold={0.1}
            onRefresh={refreshList}
            refreshing={refreshing}
            ListFooterComponent={loading && <Loading />}
            renderItem={({ item }) => <MemeCardSecondary postData={item} />}
          />
        )}
      </View>
      <GoBackButton onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.background,
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
    fontSize: 24,
    color: colors.white,
  },
  userId: {
    fontFamily: fonts.subtitle,
    fontSize: 12,
    color: colors.placeholderText,
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
    borderBottomColor: colors.divider,

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
