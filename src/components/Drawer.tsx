import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Platform} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import AuthRoutes from "../routes/auth.routes";
import { Welcome } from "../pages/Auth/Welcome";


export function Drawer(props) {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View>
          <Image
            source={require("../assets/wallpaper.jpg")}
            style={styles.userWallpaper}
          />
          <View style={styles.perfilInfo}>
            <Image
              source={require("../assets/profilePicture.png")}
              style={styles.userPicture}
            />

            <Text style={styles.title}>Usuário</Text>

            <Text style={styles.userID}>#1234</Text>
          </View>

          <View style={styles.wrapper}>
            <View style={styles.icons}>{/* Ionicons */}</View>
            <View style={styles.itemList}>
              <DrawerItemList
                {...props}
                activeBackgroundColor={colors.purple}
                inactiveBackgroundColor={colors.lightBackground}
                activeTintColor={colors.white}
                inactiveTintColor={colors.white}
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
    backgroundColor: colors.background,
    width: "100%",
    borderRadius: 20,
  },
  userWallpaper: {
    height: 100,
    width: "100%",
    resizeMode: "cover",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: Platform.OS === 'ios' ? -55 : -5
  },
  userPicture: {
    height: 70,
    width: 70,
    marginTop: -20,
    borderRadius: 35,
  },
  perfilInfo: {
    flexDirection: "row",
  },
  title: {
    color: colors.white,
    fontFamily: fonts.heading,
    fontSize: 17,
    marginTop: 9,
    marginLeft: 5,
  },
  userID: {
    marginTop: 9,
    fontFamily: fonts.subtitle,
    color: colors.placeholderText,
    fontSize: 17,

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
  logout:{
    backgroundColor: colors.pastelRed,
    marginHorizontal: 100,
    borderRadius: 5,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  logoutText: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: fonts.subtitle,
    fontWeight: 'bold'

  }
});
