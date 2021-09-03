import React from "react";
import { Text } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

export function Drawer(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <Text>Drawer Estilizado!</Text>
    </DrawerContentScrollView>
  );
}
