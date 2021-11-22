import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";
import colors from "../styles/colors";

import fonts from "../styles/fonts";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

interface ProfileInfoProps {
  theme: boolean;
  cover: any;
  avatar: any;
  userName: string;
  userTag: any;
  followers: number;
  following: number;
  isForeignUser: boolean;
  isFollower: boolean;
  whenFollow: any;
  whenUnfollow: any;
}

export function ProfileInfo({
  theme,
  cover,
  avatar,
  userName,
  userTag,
  followers,
  following,
  isForeignUser,
  isFollower,
  whenFollow,
  whenUnfollow,
}: ProfileInfoProps) {
  const navigation = useNavigation();

  return (
    <>
      <Image
        source={cover ? { uri: cover } : require("../assets/wallpaper.jpg")}
        style={styles.userWallpaper}
      />
      <View style={styles.followButtonContainer}>
        {
          //Exibe o botão de DEIXAR DE SEGUIR caso o usuário seja diferente do local
          isForeignUser && isFollower ? (
            <TouchableOpacity
              onPress={whenUnfollow}
              style={[
                styles.followButton,
                {
                  backgroundColor: theme
                    ? colors.searchBarColorLight
                    : colors.inputBackground,
                },
              ]}
            >
              <Text
                style={[
                  styles.text,
                  { color: theme ? colors.whiteLight : colors.white },
                ]}
              >
                Seguindo
              </Text>
            </TouchableOpacity>
          ) : (
            // Exibe o botão de SEGUIR caso o usuário seja diferente do local
            isForeignUser &&
            !isFollower && (
              <TouchableOpacity
                onPress={whenFollow}
                style={[
                  styles.followButton,
                  {
                    backgroundColor: theme ? colors.purpleLight : colors.purple,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.text,
                    { color: theme ? colors.whiteLight : colors.white },
                  ]}
                >
                  Seguir
                </Text>
              </TouchableOpacity>
            )
          )
        }
        {!isForeignUser && (
          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileSettings")}
            style={[
              styles.followButton,
              {
                backgroundColor: theme
                  ? colors.searchBarColorLight
                  : colors.inputBackground,
              },
            ]}
          >
            <Text
              style={[
                styles.text,
                { color: theme ? colors.whiteLight : colors.white },
              ]}
            >
              Editar Perfil
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.profileInfo}>
        <View style={styles.userNameImgBox}>
          {avatar ? (
            <Avatar.Image size={100} source={{ uri: avatar }} />
          ) : (
            <Avatar.Text size={100} label={userName} />
          )}
          <View style={{ marginTop: 20, paddingLeft: 8 }}>
            <Text
              style={[
                styles.userName,
                theme ? { color: colors.whiteLight } : { color: colors.white },
              ]}
            >
              {userName}
            </Text>
            <Text
              style={[
                styles.userId,
                theme
                  ? { color: colors.placeholderTextLight }
                  : { color: colors.placeholderText },
              ]}
            >
              {`#${userTag}`}
            </Text>
          </View>
        </View>

        <View style={styles.statisticContainer}>
          <View style={styles.lineText}>
            <Text
              style={[
                styles.text,
                theme ? { color: colors.whiteLight } : { color: colors.white },
              ]}
            >
              Seguindo
            </Text>
            <Text
              style={[
                styles.greenText,
                theme ? { color: colors.greenLight } : { color: colors.green },
              ]}
            >
              {followers}
            </Text>
          </View>

          <View style={styles.lineText}>
            <Text
              style={[
                styles.text,
                theme ? { color: colors.whiteLight } : { color: colors.white },
              ]}
            >
              Seguidores
            </Text>
            <Text
              style={[
                styles.greenText,
                theme ? { color: colors.greenLight } : { color: colors.green },
              ]}
            >
              {following}
            </Text>
          </View>
        </View>
      </View>
    </>
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
  statisticContainer: {
    marginTop: 20,
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
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: -60,
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
    borderTopLeftRadius: 8,
  },
  followButtonContainer: {
    alignSelf: "flex-end",
    top: -37,
  },
  unFollowButton: {},
});
