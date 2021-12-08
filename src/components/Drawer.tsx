import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import AuthContext from "../contexts/Auth";
import { Avatar } from "react-native-paper";

interface DrawerProps extends DrawerContentComponentProps {
  theme: boolean;
}

export function Drawer({ theme, ...props }: DrawerProps) {
  const { isAnonymous, user } = useContext(AuthContext);

  return (
    <View
      style={[
        styles.container,
        theme
          ? { backgroundColor: colors.backgroundLight }
          : { backgroundColor: colors.background },
      ]}
    >
      <DrawerContentScrollView {...props}>
        <View>
          <Image
            source={
              user?.cover
                ? { uri: user.cover }
                : require("../assets/wallpaper.jpg")
            }
            style={styles.userWallpaper}
          />
          <View style={styles.perfilInfo}>
            {isAnonymous ? (
              <Avatar.Image
                size={70}
                style={styles.userPicture}
                source={require("../assets/risumDefault.png")}
              />
            ) : user?.avatar ? (
              <Avatar.Image
                size={70}
                style={styles.userPicture}
                source={{ uri: user.avatar }}
              />
            ) : (
              <Avatar.Text
                size={70}
                style={styles.userPicture}
                label={`${user?.userName.substr(0, 1)}`}
              />
            )}
            <Text
              style={[
                styles.title,
                theme ? { color: colors.whiteLight } : { color: colors.white },
              ]}
            >
              {isAnonymous ? "Convidado" : user?.userName}
            </Text>

            <Text
              style={[
                styles.userID,
                theme
                  ? { color: colors.placeholderTextLight }
                  : { color: colors.placeholderText },
              ]}
            >
              {isAnonymous ? "" : `#${user?.tag}`}
            </Text>
          </View>

          <View style={styles.wrapper}>
            <View style={styles.itemList}>
              <DrawerItemList
                {...props}
                activeBackgroundColor={
                  theme ? colors.purpleLight : colors.purple
                }
                inactiveBackgroundColor={
                  theme ? colors.lightBackgroundLight : colors.lightBackground
                }
                activeTintColor={theme ? colors.whiteLight : colors.white}
                inactiveTintColor={theme ? colors.whiteLight : colors.white}
              />
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    borderRadius: 20,
  },
  userWallpaper: {
    height: 100,
    width: "100%",
    resizeMode: "cover",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: Platform.OS === "ios" ? -55 : -5,
  },
  userPicture: {
    marginTop: -20,
    borderRadius: 35,
    marginLeft: 10,
  },
  perfilInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 17,
    marginLeft: 9,
  },
  userID: {
    fontFamily: fonts.subtitle,
    fontSize: 15,
    marginLeft: 7,
  },
  wrapper: {
    flexDirection: "column",
  },
  icons: {
    marginVertical: 5,
  },
  itemList: {
    marginVertical: 5,
  },
  button: {
    color: colors.pink,
  },
});
