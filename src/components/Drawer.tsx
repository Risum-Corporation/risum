import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  ScrollViewProps,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import SwitchMode from "../styles/SwitchMode";

type Props = ScrollViewProps & {
  children: React.ReactNode;
};


export function Drawer({ ...props } ) {
  // Theme
  let isSwitchOn = SwitchMode.isSwitchOn;

  return (
    <View
      style={[
        styles.container,
        isSwitchOn
          ? { backgroundColor: colors.backgroundLight }
          : { backgroundColor: colors.background },
      ]}
    >
      <DrawerContentScrollView {...props}>
        <View>
          <Image
            source={require("../assets/wallpaper.jpg")}
            style={styles.userWallpaper}
          />
          <View style={styles.perfilInfo}>
            <Image
              source={require("../assets/profilePicture.gif")}
              style={styles.userPicture}
            />

            <Text
              style={[
                styles.title,
                isSwitchOn
                  ? { color: colors.whiteLight }
                  : { color: colors.white },
              ]}
            >
              Usuário
            </Text>

            <Text
              style={[
                styles.userID,
                isSwitchOn
                  ? { color: colors.placeholderTextLight }
                  : { color: colors.placeholderText },
              ]}
            >
              #1234
            </Text>
          </View>

          <View style={styles.wrapper}>
            <View style={styles.itemList}>
              <DrawerItemList
                {...props}
                activeBackgroundColor={
                  isSwitchOn ? colors.purpleLight : colors.purple
                }
                inactiveBackgroundColor={
                  isSwitchOn
                    ? colors.lightBackgroundLight
                    : colors.lightBackground
                }
                activeTintColor={isSwitchOn ? colors.whiteLight : colors.white}
                inactiveTintColor={
                  isSwitchOn ? colors.whiteLight : colors.white
                }
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
    height: 70,
    width: 70,
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
    fontSize: 14,
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
  logout: {
    backgroundColor: colors.pastelRed,
    marginHorizontal: 100,
    borderRadius: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  logoutText: {
    alignItems: "center",
    justifyContent: "center",
    fontFamily: fonts.subtitle,
    fontWeight: "bold",
  },
});
