import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import colors from "../styles/colors";

import { Ionicons } from "@expo/vector-icons";
import fonts from "../styles/fonts";

export function Drawer(props) {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.wrapper}>
          <View style={styles.icons}>{/* Ionicons */}</View>
          <View style={styles.itemList}>
            <DrawerItemList
              {...props}
              itemStyle={styles.item}
              activeBackgroundColor={colors.purple}
              inactiveBackgroundColor={colors.lightBackground}
            />
          </View>
        </View>

        <Text>Drawer Estilizado!</Text>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: "100%",
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
  item: {
    color: colors.white,
  },
});
